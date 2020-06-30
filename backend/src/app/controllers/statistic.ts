import { Statistic } from "../models/statistic";
import { database } from "../../lib/database";
import { Request, Response } from "express";
import { tableName } from "../../lib/tableName";
import * as statisticSerializer from '../serializers/statistic';
import { StatisticValidity } from '../../lib/enums';
import { QueryBuilder } from "knex";
import { limitQuery } from "../../lib/queryParamHandlers/limit";
import { offsetQuery } from "../../lib/queryParamHandlers/offset";

export const index = async (req: Request, res: Response) => {
  try{
  let query: QueryBuilder = database(tableName.STATISTICS).select();
  query = limitQuery(req, query);
  query = offsetQuery(req, query);
  const statistics: Array<Statistic> = await query;
  res.json(statisticSerializer.index(statistics));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const statistic: Statistic = await database(tableName.STATISTICS).select().where({ id: req.params.id }).first();
    if (statistic) {
      res.json(statistic);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    
  }
}