import { Request } from 'express';
import { QueryBuilder } from 'knex';

export const filterMethod = (req: Request, query: QueryBuilder): void => {
 if(req.query.method) query.where({ method: req.query.method });
};
