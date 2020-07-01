import { Request } from 'express';
import { QueryBuilder } from 'knex';

const convertUnix = (date: Date) : number => {
  return (new Date(date).getTime())*1000000;
}

export const filterSimulationStartTime = (req: Request, query: QueryBuilder) => {
  const unixDay = 86340000000000;
  if (req.query.started_after && req.query.started_before) {
    const startedAfter = convertUnix(req.query.started_after);
    const startedBefore = convertUnix(req.query.started_before)+unixDay;
    query.whereBetween('start_timestamp', [startedAfter, startedBefore]);
  }
  return query;
};
