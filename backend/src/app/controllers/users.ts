import { Users } from "../models/users";
import { database } from "../../lib/database";
import { Request, Response } from "express";
import * as usersSerializer from '../serializers/users';
import * as bcrypt from 'bcrypt';
import { QueryBuilder } from "knex";

export const index = async (req: Request, res: Response) => {
  let query: QueryBuilder = database('users').select();
  if (req.query.limit) {
    query = query.limit(req.query.limit);
  }
  if (req.query.offset) {
    query = query.offset(req.query.offset);
  }
  const user: Array<Users> = await query;
  res.json(usersSerializer.index(user));
};

export const show = async (req: Request, res: Response) => {
  try {
    const user: Users = await database('users').select().where({ id: req.params.id }).first();
    console.log(user);
    if (typeof user !== 'undefined') {
      res.json(usersSerializer.show(user))
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
    const users: Users = {
      password_hash: encryptedPassword,
      email: req.body.email,
      git_user: req.body.git_user,
      role: req.body.role,
      notification: req.body.notification
    }
    await database('users').insert(users);
    res.sendStatus(201);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const user: Users = await database('users').select().where({ id: req.params.id }).first();
    if (user) {
      const newUser: Users = {
        email: req.body.email,
        git_user: req.body.git_user,
        role: req.body.role,
        notification: req.body.notification
      }
      await database('users').update(newUser).where({ id: req.params.id });
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
    const user: Users = await database('users').select().where({ id: req.params.id }).first();
    if (user) {
      await database('users').delete().where({ id: req.params.id });
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};