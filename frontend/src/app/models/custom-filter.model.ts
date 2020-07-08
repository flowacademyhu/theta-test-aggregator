import { TestStatus } from './test.model';

export interface CustomFilter {
  id?: number;
  name: string;
  triggered_by: string;
  commit_hash: string;
  status: TestStatus;
  started_after: Date;
  started_before: Date;
}
