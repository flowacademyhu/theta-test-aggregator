import { SimulationResultValidity } from "../../lib/enums/enum";
import { SimulationResultStatus } from "../../lib/enums/enum";

export interface SimulationResult {
  id: string;
  triggered_by: string;
  branch_name: string;
  start_timestamp: number;
  end_timestamp: number;
  commit_hash: string;
  status: SimulationResultStatus;
  error_message: string;
  short_description: string;
  payload_data: any;
  payload_text: string;
  sequence_number?: number;
  invalid?: SimulationResultValidity;
  createdt_at?: string;
  updated_at?: string
};
