import { SimulationResult } from '../models/simulationResult';
import { Request, Response } from 'express';
import { database } from '../../lib/database';
import { QueryBuilder } from 'knex';
import { limitQuery } from '../../lib/queryParamHandlers/limit';
import { offsetQuery } from '../../lib/queryParamHandlers/offset';
import { filterHandler } from '../../lib/queryParamHandlers/filterHandler';
import { tableName } from '../../lib/tableName';
import { SimulationResultValidity } from "../../lib/enums/enum";
import { SimulationResultStatus } from "../../lib/enums/enum";

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

const getUpdatedSimulationResult = (req: Request): SimulationResult =>{
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
    payload_data: req.body.payload_data,
    payload_text: req.body.payload_text,
    invalid: SimulationResultValidity.VALID
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
