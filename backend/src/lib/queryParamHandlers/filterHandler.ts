import { Request } from 'express';
import { QueryBuilder } from 'knex';
import { filterCommitHash } from './filterCommitHash';
import { filterStatus } from './filterStatus';
import { filterTriggeredBy } from './filterTriggeredBy';
import { filterSimulationStartTime } from './filterStartTimeRange';
import { filterSimulationEndTime } from './filterEndTimeRange';

export const filterHandler = (req: Request, query: QueryBuilder): void => {
  filterCommitHash(req, query);
  filterStatus(req, query);
  filterTriggeredBy(req, query);
  filterSimulationStartTime(req, query);
  filterSimulationEndTime(req, query);
};
