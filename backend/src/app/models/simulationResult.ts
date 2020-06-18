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
  invalid?: number;
  createdt_at?: string;
  updated_at?: string
};

export enum SimulationResultStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  ERROR = 'ERROR',
  UNKNOWN = 'UNKNOWN'
};
