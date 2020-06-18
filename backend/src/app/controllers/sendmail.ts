import { SimulationResultStatus } from "../models/simulationResult";
import { Request, Response, NextFunction } from "express";
import { database } from '../../lib/database';
import { tableName } from '../../lib/tableName';
import { mailer } from "../../lib/mailer";

export const sendMail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.params.status === SimulationResultStatus.ERROR || req.params.status === SimulationResultStatus.FAILED) {
      const address = await database(tableName.USERS).select('email').where({git_user: req.params.triggered_by}).first();
      mailer(address);
      res.sendStatus(200);
      return next();
    }  
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
