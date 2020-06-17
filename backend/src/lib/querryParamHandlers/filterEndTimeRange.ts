import { Request } from 'express';
import { QueryBuilder } from 'knex';

export const filterSimulationStartTime = (req: Request, query: QueryBuilder) => {
  if (req.query.ended_after && req.query.ended_before) {
    query.whereBetween('start_timestamp', [req.query.ended_after, req.query.ended_before])
  }
  return query;
};
