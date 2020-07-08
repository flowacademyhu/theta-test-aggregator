import { CustomFilter } from '../models/customFilter';
import { SimulationResultStatus } from '../../lib/enums';

export interface CustomFilterSerializer {
  id: number;
  name: string;
  triggered_by?: string;
  commit_hash?: string;
  status?: SimulationResultStatus;
  started_after?: number;
  started_before?: number;
};

export const show = (customFilter: CustomFilter): CustomFilterSerializer => {
  return {
    id: customFilter.id,
    name: customFilter.name,
    triggered_by: customFilter.triggered_by,
    commit_hash: customFilter.commit_hash,
    status: customFilter.status,
    started_after: customFilter.started_after,
    started_before: customFilter.started_before
  };
};

export const index = (customFilters: Array<CustomFilter>): Array<CustomFilterSerializer> => {
  return customFilters.map((customFilter: CustomFilter) => show(customFilter));
};
