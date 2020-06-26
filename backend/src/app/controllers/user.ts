import { User } from "../models/user";
import { database } from "../../lib/database";
import { Request, Response, NextFunction } from "express";
import * as userSerializer from '../serializers/user';
import * as bcrypt from 'bcrypt';
import { QueryBuilder } from "knex";
import { tableName } from '../../lib/tableName';
import { limitQuery } from '../../lib/queryParamHandlers/limit';
import { offsetQuery } from '../../lib/queryParamHandlers/offset';
import { v4 as uuidv4 } from 'uuid';
import { userRole } from "../../lib/enums"

export const index = async (req: Request, res: Response) => {
  let query: QueryBuilder = database(tableName.USERS).select();
  query = limitQuery(req, query);
  query = offsetQuery(req, query);
  const user: Array<User> = await query;
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

const generateUUID = (): string => {
  return uuidv4();
}

export const create = async (req: Request, res: Response) => {
  try {
    const pw = req.body.password;
    const encryptedPassword = bcrypt.hashSync(pw, 10);
    const users: User = {
      id: generateUUID(),
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

const updatePassword = (req: Request, user: Partial<User>) => {
  if (req.body.password) {
    const pw = req.body.password;
    const encryptedPassword = bcrypt.hashSync(pw, 10);
    user.password_hash = encryptedPassword;
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const user: Partial<User> = await database(tableName.USERS).select().where({ id: req.params.id }).first();   
    if (user) {
      const newUser: Partial<User> = {
        email: req.body.email,
        git_user: req.body.git_user,
        role: req.body.role,
        notification: req.body.notification
      }
      updatePassword(req, newUser);
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

export const userUpdateAuthorization = (req: Request, res: Response, next: NextFunction) => {
  if(res.locals.user.role === userRole.ADMIN || res.locals.user.id === req.params.id) {
    next();
  } else {
    res.sendStatus(403);
  }
};