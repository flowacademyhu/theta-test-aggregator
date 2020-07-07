import { SimulationResultStatus } from "../../lib/enums";

export interface CustomFilter {
  id: number;
  name: string;
  user_id: string;
  triggered_by?: string;
  commit_hash?: string;
  status?: SimulationResultStatus;
  started_after?: Date;
  started_before?: Date;
  created_at?: string;
  updated_at?: string;
}