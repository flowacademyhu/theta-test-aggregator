import { CustomFilter } from '../models/customFilter';
import { database } from "../../lib/database";
import { Request, Response } from "express";
import { QueryBuilder } from 'knex';
import { tableName } from '../../lib/tableName';
import { limitQuery } from '../../lib/queryParamHandlers/limit';
import { offsetQuery } from '../../lib/queryParamHandlers/offset';

export const index = async (req: Request, res: Response) => {
  try {
    let query: QueryBuilder = database(tableName.CUSTOM_FILTERS).select().where({user_id: res.locals.user.id});
    limitQuery(req, query);
    offsetQuery(req, query);
    const customFilters: Array<CustomFilter> = await query;
    res.json(customFilters);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}