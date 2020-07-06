import { SimulationResultStatus } from '../../lib/enums';
import { SimulationResult } from '../models/simulationResult';

interface SimulationResultIndexSerializer {
  id: string;
  triggered_by: string;
  commit_hash: string;
  status: SimulationResultStatus; 
};

interface SimulationResultShowSerializer {
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
};

export const show = (simulationResult: SimulationResult): SimulationResultShowSerializer => {
  return {
    id: simulationResult.id,
    triggered_by: simulationResult.triggered_by,
    branch_name: simulationResult.branch_name,
    start_timestamp: simulationResult.start_timestamp,
    end_timestamp: simulationResult.end_timestamp,
    commit_hash: simulationResult.commit_hash,
    status: simulationResult.status,
    error_message: simulationResult.error_message,
    short_description: simulationResult.short_description,
    payload_data: simulationResult.payload_data,
    payload_text: simulationResult.payload_text
  };
};

export const index = (simulationResults: Array<SimulationResult>): Array<SimulationResultIndexSerializer> => {
  return simulationResults.map((simulationResult: SimulationResult) => {
    return {
      id: simulationResult.id,
      triggered_by: simulationResult.triggered_by,
      commit_hash: simulationResult.commit_hash,
      status: simulationResult.status
    };
  });
};
