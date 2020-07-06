import { Request } from 'express';
import { QueryBuilder } from 'knex';

export const filterSimulationEndTime = (req: Request, query: QueryBuilder): void => {
  if (req.query.ended_after && req.query.ended_before) {
    query.whereBetween('start_timestamp', [+req.query.ended_after, +req.query.ended_before])
  }
};
