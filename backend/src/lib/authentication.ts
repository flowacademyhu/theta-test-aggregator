import { Request, Response, NextFunction } from "express";
import { User } from "../app/models/user";
import { database } from "./database";
import * as jwt from "jsonwebtoken";
import * as jwtConfig from '../../config/jwt.json';
import { Method } from "./enums";
import { tableName } from "./tableName";

interface AnonymusEndpoint {
  path: string;
  method: Method;
};

const anonymusEndpoints: Array<AnonymusEndpoint> = [
  {
    path: '/api/login',
    method: Method.post
  },
  {
    path: '/api/simulationResult',
    method: Method.post
  },
  {
    path: '/api/simulationResult/{id}',
    method: Method.put
  },
  {
    path: '/api/login/google',
    method: Method.post
  }
];

const isAnonymusEndpoint = (req: Request): boolean => {
  //@ts-ignore
  return !!(anonymusEndpoints.find(anonymusEndpoint => (anonymusEndpoint.method === req.method && anonymusEndpoint.path === req.swagger.pathName)))
};

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (isAnonymusEndpoint(req)) {
      return next();
    };
    const token: string = req.headers.authorization.split(' ')[1];
    const info = jwt.verify(token, jwtConfig.secret);
    const userId: number = info.userId;
    const user: User = await database(tableName.USERS).where({ id: userId }).first();
    res.locals.user = user;
    next();
  } catch(error) {
    res.sendStatus(401);
  }
};
