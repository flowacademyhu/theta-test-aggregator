import { Request, Response, NextFunction } from "express";
import { ApiKey } from "../models/apiKey";
import { database } from "../../lib/database";
import { tableName } from '../../lib/tableName';

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
  if(req.headers.apikey) {
    const apiKey: ApiKey = await database(tableName.API_KEYS).select().where({ key: req.headers.apikey }).first();
    if (apiKey && apiKey.key === req.headers.apikey) {
      return next();
    }
    else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(401);
  }
};
