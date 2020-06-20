import { User } from "../models/user";
import { database } from "../../lib/database";
import { Request, Response } from "express";
import * as loginSerializer from '../serializers/login';
import * as jwt from 'jsonwebtoken';
import * as jwtConfig from '../../../config/jwt.json';
import * as bycrypt from 'bcrypt';
import { tableName } from '../../lib/tableName';

const isCorrectPassword = (user: User, password: string): boolean => {
  return typeof user !== 'undefined' && bycrypt.compareSync(password, user.password_hash);
  }

export const create = async (req: Request, res: Response) => {
  try {
    const user: User = await database(tableName.USERS).select().where({ 
      email: req.body.email
    }).first();
    if (isCorrectPassword(user , req.body.password)) {
      const info = { userId: user.id };
      const token = jwt.sign(info, jwtConfig.secret);
      res.json(loginSerializer.create(token, user));
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};
