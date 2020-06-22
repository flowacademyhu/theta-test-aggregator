import { SimulationResultStatus } from "../../lib/enums";
import { Request, Response, NextFunction } from "express";
import { database } from '../../lib/database';
import { tableName } from '../../lib/tableName';
import { mailer } from "../../lib/mailer";

export const sendMail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.status === SimulationResultStatus.ERROR || req.body.status === SimulationResultStatus.FAILED) {
      const address = await database(tableName.USERS).select('email').where({git_user: req.body.triggered_by}).first();
      mailer(address.email);
      res.sendStatus(200);
      return next();
    }  
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
