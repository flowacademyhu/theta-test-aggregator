export interface FilterParamsModel {
  triggered_by?: string;
  commit_hash?: string;
  started_after?: number;
  started_before?: number;
  status?: 'SUCCESS' | 'FAILED' | 'ERROR' | 'UNKNOWN';
  limit?: number;
  offset?: number;
}
