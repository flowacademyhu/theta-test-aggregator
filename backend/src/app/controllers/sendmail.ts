import { SimulationResultStatus } from "../../lib/enums";
import { Request, Response, NextFunction } from "express";
import { database } from '../../lib/database';
import { tableName } from '../../lib/tableName';
import { mailer } from "../../lib/mailer";
import { User } from "../models/user";

export const sendMail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.status === SimulationResultStatus.ERROR || req.body.status === SimulationResultStatus.FAILED) {
      const user: User = await database(tableName.USERS).select().where({git_user: req.body.triggered_by}).first();
      if( user.notification ){
        mailer(user.email);
      }
      return next();
    }  
    next();
  } catch (error) {
    console.error(error);
  }
};
