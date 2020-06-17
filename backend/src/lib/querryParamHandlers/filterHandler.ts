import { Request } from 'express';
import { QueryBuilder } from 'knex';
import { filterCommitHash } from './filterCommitHash';
import { filterStatus } from './filterStatus';
import { filterTriggeredBy } from './filterTriggeredBy';
import { filterSimulationStartTime } from './filterStartTimeRange';
import { filterSimulationEndTime } from './filterEndTimeRange';

export const filterHandler = (req: Request, query: QueryBuilder): QueryBuilder => {
  query = filterCommitHash(req, query);
  query = filterStatus(req, query);
  query = filterTriggeredBy(req, query);
  query = filterSimulationStartTime(req, query);
  query = filterSimulationEndTime(req, query);
  return query;
}