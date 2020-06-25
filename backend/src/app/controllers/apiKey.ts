import { ApiKey } from "../models/apiKey";
import { database } from "../../lib/database";
import { Request, Response } from "express";
import { QueryBuilder } from "knex";
import { tableName } from '../../lib/tableName';
import { limitQuery } from '../../lib/queryParamHandlers/limit';
import { offsetQuery } from '../../lib/queryParamHandlers/offset';
import * as apiKeySerializer from '../serializers/apiKey';
import { v4 as uuidv4 } from 'uuid';
import moment = require('moment');

export const index = async (req: Request, res: Response) => {
  let query: QueryBuilder = database(tableName.API_KEYS).select();
  query = limitQuery(req, query);
  query = offsetQuery(req, query);
  const user: Array<ApiKey> = await query;
  res.json(apiKeySerializer.index(user));
};

export const show = async (req: Request, res: Response) => {
  try {
    const apiKey: ApiKey = await database(tableName.API_KEYS).select().where({ id: req.params.id }).first();
    console.log(apiKey);
    if (typeof apiKey !== 'undefined') {
      res.json(apiKeySerializer.show(apiKey))
      res.json(apiKey);
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const generateUUID = (): string => {
  return uuidv4();
}

const createDate = (expirationInDays: number): string => {
  return moment().add(expirationInDays, 'd').format('YYYY-MM-DD HH:mm:ss');
}

const getExpirationDays = (req: Request): number => {
  if (req.query.infinite) {
    return 500 * 365;
  }
  return +process.env.APIKEY_EXP_DAYS
}

export const create = async (req: Request, res: Response) => {
  try {
    const apiKeys: ApiKey = {
      key: generateUUID(),
      created_at: createDate(0),
      expires_at: createDate(getExpirationDays(req))
    }
    await database(tableName.API_KEYS).insert(apiKeys);
    res.sendStatus(201);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const apiKey: Partial<ApiKey> = await database(tableName.API_KEYS).select().where({ id: req.params.id }).first();

    if (apiKey) {
      const newApiKey: Partial<ApiKey> = {
        expires_at: createDate(+process.env.APIKEY_EXTENSION_DAYS)
      }
      await database(tableName.API_KEYS).update(newApiKey).where({ id: req.params.id });
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const apiKey: ApiKey = await database(tableName.API_KEYS).select().where({ id: req.params.id }).first();
    if (apiKey) {
      await database(tableName.API_KEYS).delete().where({ id: req.params.id });
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};