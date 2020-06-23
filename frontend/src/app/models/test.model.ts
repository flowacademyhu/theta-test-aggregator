export interface Test {
  id: string;
  triggered_by: string;
  branch_name: string;
  start_timestamp: number;
  end_timestamp: number;
  commit_hash: string;
  status: TestStatus;
  error_message: string;
  short_description: string;
  payload_data: JSON;
  payload_text: string;
  invalid: number;
}

export enum TestStatus {
  SUCCESS = "success",
  FAILED = "failed",
  ERROR = "error",
  UNKNOWN = "unknown"
}