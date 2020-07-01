import { Request } from 'express';
import { QueryBuilder } from 'knex';

export const filterEndpoint = (req: Request, query: QueryBuilder) => {
  return req.query.endpoint ? query.where({ endpoint: req.query.endpoint }) : query;
};
