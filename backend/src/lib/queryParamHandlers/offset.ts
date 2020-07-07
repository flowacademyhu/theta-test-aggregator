import { Request } from 'express';
import { QueryBuilder } from 'knex';

export const offsetQuery = (req: Request, query: QueryBuilder): void => {
  if(req.query.offset) query.offset(+req.query.offset);
};
