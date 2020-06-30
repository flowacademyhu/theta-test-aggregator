export interface FilterParamsModel {
  triggered_by?: string;
  commit_hash?: string;
  status?: 'SUCCESS' | 'FAILED' | 'ERROR' | 'UNKNOWN';
}
