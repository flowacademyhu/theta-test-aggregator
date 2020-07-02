import { Request } from 'express';
import { QueryBuilder } from 'knex';

export const filterTriggeredBy = (req: Request, query: QueryBuilder): void => {
 if(req.query.triggered_by) query.where({ triggered_by: req.query.triggered_by });
};
