import { SimulationResult } from "../models/simulationResult";
import { SimulationResultStatus, SimulationResultValidity } from "../../lib/enums"

interface SimulationResultSerializer {
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
  sequence_number: number;
  invalid: SimulationResultValidity;
};

interface SimulationResultIndexResponse {
  count: number;
  tests: Array<Partial<SimulationResultSerializer>>;
}

export const show = (simulationResult: SimulationResult): SimulationResultSerializer => {
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
      payload_text: simulationResult.payload_text,
      sequence_number: simulationResult.sequence_number,
      invalid: simulationResult.invalid
  }
};

export const index = (count: number, simulationResults: Array<SimulationResult>): SimulationResultIndexResponse => {
  return {
    count: count,
    tests: simulationResults.map((simulationResult: SimulationResult) => show(simulationResult))
  };
};