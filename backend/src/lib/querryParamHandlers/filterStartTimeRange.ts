import { Request } from 'express';
import { QueryBuilder } from 'knex';

export const filterSimulationStartTime = (req: Request, query: QueryBuilder) => {
  if (req.query.started_after && req.query.started_before) {
    query.whereBetween('start_timestamp', [req.query.started_after, req.query.started_before])
  }
  return query;
}