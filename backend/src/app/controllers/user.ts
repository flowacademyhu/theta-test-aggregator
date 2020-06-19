import { User } from "../models/user";
import { database } from "../../lib/database";
import { Request, Response } from "express";
import * as userSerializer from '../serializers/user';
import * as bcrypt from 'bcrypt';
import { QueryBuilder } from "knex";
import { tableName } from '../../lib/tableName';
import { limitQuery } from '../../lib/queryParamHandlers/limit';
import { offsetQuery } from '../../lib/queryParamHandlers/offset';

export const index = async (req: Request, res: Response) => {
  let query: QueryBuilder = database(tableName.USERS).select();
  query = limitQuery(req, query);
  query = offsetQuery(req, query);
  const user: Array<User> = await query;
  console.log(user);
  console.log(req);
  res.json(userSerializer.index(user));
};

export const show = async (req: Request, res: Response) => {
  try {
    const user: User = await database(tableName.USERS).select().where({ id: req.params.id }).first();
    console.log(user);
    if (typeof user !== 'undefined') {
      res.json(userSerializer.show(user))
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const pw = req.body.password_hash;
    const encryptedPassword = bcrypt.hashSync(pw, 10);
    console.log('REQ', req.body.password_hash, 'HASH', encryptedPassword);
    const users: User = {
      id: req.body.id,
      password_hash: encryptedPassword,
      email: req.body.email,
      git_user: req.body.git_user,
      role: req.body.role,
      notification: req.body.notification
    }
    await database(tableName.USERS).insert(users);
    res.sendStatus(201);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const user: Partial<User> = await database(tableName.USERS).select().where({ id: req.params.id }).first();
    const pw = req.body.password_hash;
    const encryptedPassword = bcrypt.hashSync(pw, 10);
    console.log('REQ', req.body.password_hash, 'HASH', encryptedPassword);
    if (user) {
      const newUser: User = {
        id: req.body.id,
        password_hash: encryptedPassword,
        email: req.body.email,
        git_user: req.body.git_user,
        role: req.body.role,
        notification: req.body.notification
      }
      await database(tableName.USERS).update(newUser).where({ id: req.params.id });
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
    const user: User = await database(tableName.USERS).select().where({ id: req.params.id }).first();
    if (user) {
      await database(tableName.USERS).delete().where({ id: req.params.id });
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};