import { Request } from 'express';
import { QueryBuilder } from 'knex';

const convertUnix = (date: Date) : number => {
  return (new Date(date).getTime())*1000000;
}

export const filterSimulationStartTime = (req: Request, query: QueryBuilder): void => {
  const unixDay = 86340000000000;
  let startedAfter = 962976476000000000;
  let startedBefore = 13585757276000000000;
  if (req.query.started_after || req.query.started_before) {
    if (req.query.started_after){
      startedAfter = convertUnix(req.query.started_after);
    }
    if (req.query.started_before){
      startedBefore = convertUnix(req.query.started_before)+unixDay;
    }
    query.whereBetween('start_timestamp', [startedAfter, startedBefore]);
  }
};
