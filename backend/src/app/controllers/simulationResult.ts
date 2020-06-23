import { SimulationResult, SimulationResultPayload } from '../models/simulationResult';
import { Request, Response } from 'express';
import { database } from '../../lib/database';
import { QueryBuilder } from 'knex';
import { limitQuery } from '../../lib/queryParamHandlers/limit';
import { offsetQuery } from '../../lib/queryParamHandlers/offset';
import { filterHandler } from '../../lib/queryParamHandlers/filterHandler';
import { tableName } from '../../lib/tableName';
import { SimulationResultValidity } from "../../lib/enums";
import { SimulationResultStatus } from "../../lib/enums";

export const index = async (req: Request, res: Response) => {
  try {
    let query: QueryBuilder = database(tableName.SIMULATION_RESULTS).select();
    query = limitQuery(req, query);
    query = offsetQuery(req, query);
    query = filterHandler(req, query);
    const simulationResults: Array<SimulationResult> = await query;
    res.json(simulationResults);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const simulationResult: SimulationResult = await database(tableName.SIMULATION_RESULTS).select().where({ id: req.params.id }).first();
    if (simulationResult) {
      res.json(simulationResult);
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

export const invalidate = async (req: Request, res: Response) => {
  try {
    const simulation_result: Partial<SimulationResult> = await database(tableName.SIMULATION_RESULTS).select().where({ id: req.params.id }).first();
    if (simulation_result) {
      await database(tableName.SIMULATION_RESULTS).where({ id: req.params.id }).update({ invalid: SimulationResultValidity.INVALID });
      res.sendStatus(200);
    } else { 
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
