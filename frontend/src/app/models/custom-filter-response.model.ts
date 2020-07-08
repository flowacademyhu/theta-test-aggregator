import { TestStatus } from './test.model';

export interface CustomFilterResponse {
  id: number;
  name: string;
  triggered_by: string;
  commit_hash: string;
  status: TestStatus;
  started_after: number;
  started_before: number;
}
