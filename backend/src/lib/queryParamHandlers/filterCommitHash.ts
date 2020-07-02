import { Request } from 'express';
import { QueryBuilder } from 'knex';

export const filterCommitHash = (req: Request, query: QueryBuilder): void => {
 if(req.query.commit_hash) query.where({ commit_hash: req.query.commit_hash });
};
