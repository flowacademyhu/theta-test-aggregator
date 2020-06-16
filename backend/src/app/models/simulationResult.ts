export interface SimulationResult {
  id: string;
  triggeredBy: string;
  branchName: string;
  startTimestamp: number;
  endTimestamp: number;
  commitHash: string;
  status: 'SUCCESS' | 'FAILED' | 'ERROR' | 'UNKNOWN';
  errorMessage: string;
  shortDescription: string;
  payloadData: JSON;
  payloadText: string;
  sequenceNumber?: number;
  invalid?: number;
  createdAt?: string;
  updatedAt?: string
}