import { User } from "../models/user";
import { database } from "../../lib/database";
import { Request, Response } from "express";
import * as loginSerializer from '../serializers/login';
import * as jwt from 'jsonwebtoken';
import * as jwtConfig from '../../../config/jwt.json';
import * as bcrypt from 'bcrypt';
import { tableName } from '../../lib/tableName';
import { OAuth2Client, LoginTicket } from 'google-auth-library';
import { IdToken } from '../models/idToken';

const isCorrectPassword = (user: User, password: string): boolean => {
  return typeof user !== 'undefined' && bcrypt.compareSync(password, user.password_hash);
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

const verify = async (req: Request, client: OAuth2Client): Promise<LoginTicket> => {
  return await client.verifyIdToken({
    idToken: req.body.token,
    audience: process.env.CLIENT_ID
  });
};

export const googleLogin = async (req: Request, res: Response) => {
  const client = new OAuth2Client(process.env.CLIENT_ID);
  try {
    const ticket = await verify(req, client);
    const payload = ticket.getPayload();
    const user: User = await database(tableName.USERS).select().where({ email: payload.email }).first();
    if (user) {
      const info = { userId: user.id }
      const token = jwt.sign(info, jwtConfig.secret);
      res.json(loginSerializer.create(token, user));
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }    
};
