import { Statistic } from '../models/statistic';

export interface StatisticSerializer {
  id: number;
  simulation_result_id: string;
  start_timestamp: number;
  method: string;
  endpoint: string;
  measurement: number;
}

export const show = (statistic: Statistic): StatisticSerializer => {
  return {
    id: statistic.id,
    simulation_result_id: statistic.simulation_result_id,
    start_timestamp: statistic.start_timestamp,
    method: statistic.method,
    endpoint: statistic.endpoint,
    measurement: statistic.measurement
  }
};

export const index = (statistics: Array<Statistic>): Array<StatisticSerializer> => {
  return statistics.map((statistic: Statistic) => show(statistic));
};
