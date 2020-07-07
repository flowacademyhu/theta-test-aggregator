import { SimulationResult, SimulationResultPayload } from '../models/simulationResult';
import { Request, Response } from 'express';
import { database } from '../../lib/database';
import { QueryBuilder } from 'knex';
import { limitQuery } from '../../lib/queryParamHandlers/limit';
import { offsetQuery } from '../../lib/queryParamHandlers/offset';
import { filterHandler } from '../../lib/queryParamHandlers/filterHandler';
import { tableName } from '../../lib/tableName';
import { SimulationResultValidity, SimulationResultStatus, StatisticValidity } from '../../lib/enums';
import { Statistic } from '../models/statistic';
import * as simulationResultSerializer from '../serializers/simulationResult';

interface CountQuery {
  'count(*)': number;
}

export const index = async (req: Request, res: Response) => {
  try {
    let query: QueryBuilder = database(tableName.SIMULATION_RESULTS)
      .select()
      .whereNot({ invalid: SimulationResultValidity.INVALID })
      .orderBy('sequence_number', 'desc');
    let countQuery: QueryBuilder = database(tableName.SIMULATION_RESULTS).count();
    limitQuery(req, query);
    offsetQuery(req, query);
    filterHandler(req, query);
    filterHandler(req, countQuery);
    const simulationResults: Array<SimulationResult> = await query;
    const count: CountQuery = await countQuery.whereNot({ invalid: SimulationResultValidity.INVALID }).first();
    res.json(simulationResultSerializer.index(count["count(*)"], simulationResults));
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const simulationResult: SimulationResult = await database(tableName.SIMULATION_RESULTS).select().where({ id: req.params.id }).first();
    if (simulationResult) {
      res.json(simulationResultSerializer.show(simulationResult));
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const initialize = async (req: Request, res: Response) => {
  try {
    const initializedSimulationResult: Partial<SimulationResult> = {
      id: req.body.id,
      triggered_by: req.body.triggered_by,
      branch_name: req.body.branch_name,
      status: SimulationResultStatus.UNKNOWN
    }
    await database(tableName.SIMULATION_RESULTS).insert(initializedSimulationResult);
    res.sendStatus(201)
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const decodeBase64 = (data: string): string => {
  return Buffer.from(data, 'base64').toString();
};

const decodePayload = (req: Request): SimulationResultPayload => {
  try {
    const decodedData = decodeBase64(req.body.payload.data);
    const decodedText = decodeBase64(req.body.payload.text);
    return {data: decodedData, text: decodedText };
  } catch (error) {
    throw error;
  }  
};

const convertTimeToNanosec = (measurementAsString: string): number => {  // 1234.55ms
  const index = measurementAsString.search(/[a-zA-Z]+/);
  let measurementValue = parseFloat(measurementAsString.substring(0, index));
  const measurementTimeUnit = measurementAsString.substring(index, measurementAsString.length);
  if (measurementTimeUnit === "sec") {
    measurementValue *= 1000000000;
  } else if (measurementTimeUnit === "min") {
    measurementValue *= 60000000000;
  } else if (measurementTimeUnit === "ms") {
    measurementValue *= 1000000;
  } else if (measurementTimeUnit === "μs") {
    measurementValue *= 1000;
  }
  return measurementValue;
};

const createStatistic = async (simulationResult: SimulationResult) => {
  try {
    const payload_data = JSON.parse(simulationResult.payload_data);
    console.log(payload_data);
    const start_timestamp = simulationResult.start_timestamp;
    for (let stage of Object.keys(payload_data)) {
      for (let i = 0; i < payload_data[stage].length; i++) {
        if (payload_data[stage][i].measurement !== '') {
          const methodEndpoint = payload_data[stage][i].endpoint.split(" ");
          const method = methodEndpoint[0];
          const fullEndpoint = methodEndpoint[1].split("/api/");
          const endpoint = "/api/" + fullEndpoint[1];
          const measurement = convertTimeToNanosec(payload_data[stage][i].measurement);
          const statistic: Statistic = {
            simulation_result_id: simulationResult.id,
            start_timestamp: start_timestamp,
            method: method,
            endpoint: endpoint,
            measurement: measurement,
            invalid: StatisticValidity.VALID
          }
          await database(tableName.STATISTICS).insert(statistic);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getUpdatedSimulationResult = (req: Request): SimulationResult =>{
  try {
    const decodedPayload: SimulationResultPayload = decodePayload(req);
    return {
      id: req.body.id,
      triggered_by: req.body.triggered_by,
      branch_name: req.body.branch_name,
      start_timestamp: req.body.start_timestamp,
      end_timestamp: req.body.end_timestamp,
      commit_hash: req.body.commit_hash,
      status: req.body.status,
      error_message: req.body.error_message,
      short_description: req.body.short_description,
      payload_data: decodedPayload.data,
      payload_text: decodedPayload.text,
      invalid: SimulationResultValidity.VALID
    }
  } catch (error) {
    throw error;
  }  
};

export const update = async (req: Request, res: Response) => {
  try {
    const initializedSimulationResult: Partial<SimulationResult> = await database(tableName.SIMULATION_RESULTS).select().where({ id: req.params.id }).first();
    if (initializedSimulationResult) {
      const updatedSimulationResult: SimulationResult = getUpdatedSimulationResult(req);
      await database(tableName.SIMULATION_RESULTS).update(updatedSimulationResult).where({ id: req.params.id });
      try {
        createStatistic(updatedSimulationResult);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }   
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const simulation_result: Partial<SimulationResult> = await database(tableName.SIMULATION_RESULTS).select().where({ id: req.params.id }).first();
    if (simulation_result) {
      await database(tableName.SIMULATION_RESULTS).delete().where({ id: req.params.id });
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const invalidateStatistic = async (simulation_result: Partial<SimulationResult>) => {
  try {
    const statistics: Array<Statistic> = await database(tableName.STATISTICS).select().where({ simulation_result_id: simulation_result.id });
    if (statistics) {
      await database(tableName.STATISTICS).where({ simulation_result_id: simulation_result.id}).update({ invalid: StatisticValidity.INVALID });
    }
  } catch (error) {
    console.log(error);
  }
};

export const invalidate = async (req: Request, res: Response) => {
  try {
    const simulation_result: Partial<SimulationResult> = await database(tableName.SIMULATION_RESULTS).select().where({ id: req.params.id }).first();
    if (simulation_result) {
      await database(tableName.SIMULATION_RESULTS).where({ id: req.params.id }).update({ invalid: SimulationResultValidity.INVALID });
      invalidateStatistic(simulation_result);
      res.sendStatus(200);
    } else { 
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
