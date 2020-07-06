import { Request } from 'express';
import { QueryBuilder } from 'knex';

export const filterStatus = (req: Request, query: QueryBuilder): void => {
 if(req.query.status) query.where({ status: req.query.status });
};
