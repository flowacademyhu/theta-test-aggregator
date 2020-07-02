import { Request } from 'express';
import { QueryBuilder } from 'knex';

export const limitQuery = (req: Request, query: QueryBuilder): void => {
  if (req.query.limit) query.limit(req.query.limit);
};
