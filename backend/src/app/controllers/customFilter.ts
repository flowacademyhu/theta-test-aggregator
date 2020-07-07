import { CustomFilter } from '../models/customFilter';
import * as customFilterSerializer from '../serializers/customFilter';
import { database } from "../../lib/database";
import { Request, Response } from "express";
import { QueryBuilder } from 'knex';
import { tableName } from '../../lib/tableName';
import { limitQuery } from '../../lib/queryParamHandlers/limit';
import { offsetQuery } from '../../lib/queryParamHandlers/offset';

export const index = async (req: Request, res: Response) => {
  try {
    let query: QueryBuilder = database(tableName.CUSTOM_FILTERS).select().where({user_id: res.locals.user.id});
    limitQuery(req, query);
    offsetQuery(req, query);
    const customFilters: Array<CustomFilter> = await query;
    res.json(customFilterSerializer.index(customFilters));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const convertUnix = (date: Date) : number => {
  return (new Date(date).getTime())*1000000;
}

export const create = async (req: Request, res: Response) => {
  const started_after = convertUnix(req.body.started_after);
  const started_before = convertUnix(req.body.started_before);
  try {
    const customFilter: CustomFilter = {
      name: req.body.name,
      user_id: res.locals.user.id,
      triggered_by: req.body.triggered_by,
      commit_hash: req.body.commit_hash,
      status: req.body.status,
      started_after: started_after,
      started_before: started_before
    }
    await database(tableName.CUSTOM_FILTERS).insert(customFilter);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const customFilter = await database(tableName.CUSTOM_FILTERS).select().where({ id: req.params.id }).first();
    if (customFilter) {
      await database(tableName.CUSTOM_FILTERS).delete().where({ id: req.params.id });
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};