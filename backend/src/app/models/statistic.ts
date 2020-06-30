import { StatisticValidity } from "../../lib/enums";

export interface Statistic {
  id?: number;
  simulation_result_id: string;
  start_timestamp: number;
  method: string;
  endpoint: string;
  measurement: number;
  invalid: StatisticValidity;
  created_at?: string,
  updated_at?: string
}