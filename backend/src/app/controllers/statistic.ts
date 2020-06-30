import { Statistic } from "../models/statistic";
import { database } from "../../lib/database";
import { Request, Response } from "express";
import { tableName } from "../../lib/tableName";
import * as statisticSerializer from '../serializers/statistic';
import { StatisticValidity } from '../../lib/enums';
import { QueryBuilder } from "knex";
import { limitQuery } from "../../lib/queryParamHandlers/limit";
import { offsetQuery } from "../../lib/queryParamHandlers/offset";
import { SimulationResult } from "../models/simulationResult";

export const index = async (req: Request, res: Response) => {
  try{
  let query: QueryBuilder = database(tableName.STATISTICS).select();
  query = limitQuery(req, query);
  query = offsetQuery(req, query);
  const statistics: Array<Statistic> = await query;
  res.json(statisticSerializer.index(statistics));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const statistic: Statistic = await database(tableName.STATISTICS).select().where({ id: req.params.id }).first();
    if (statistic) {
      res.json(statistic);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const showStatisticsByEndpointAndMethod = async (req: Request, res: Response) => {
  try {
    const statistics: Array<Statistic> = await database(tableName.STATISTICS).select().where({ endpoint: req.params.endpoint, method: req.params.method });
    if (statistics) {
      res.json(statistics);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const convertMeasurement = (measurementAsString: string): number => {  // 1234.55ms
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

export const create = async (simulationResult: SimulationResult) => {
  try {
    const payload_data = JSON.parse(simulationResult.payload_data);
    const start_timestamp = simulationResult.start_timestamp;
    for (let stage of Object.keys(payload_data)) {
      for (let i = 0; i < payload_data[stage].length; i++) {
        if (payload_data[stage][i].measurement !== '') {
          const methodEndpoint = payload_data[stage][i].endpoint.split(" ");
          const method = methodEndpoint[0];
          const fullEndpoint = methodEndpoint[1].split("/api/");
          const endpoint = "/api/" + fullEndpoint[1];
          const measurement = convertMeasurement(payload_data[stage][i].measurement);
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

export const invalidate = async (simulation_result: Partial<SimulationResult>) => {
  try {
    const statistics: Array<Statistic> = await database(tableName.STATISTICS).select().where({ simulation_result_id: simulation_result.id });
    if (statistics) {
      await database(tableName.STATISTICS).where({ simulation_result_id: simulation_result.id}).update({ invalid: StatisticValidity.INVALID });
    }
  } catch (error) {
    console.log(error);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const statistic: Statistic = await database(tableName.STATISTICS).select().where({ id: req.params.id }).first();
    if (statistic) {
      await database(tableName.STATISTICS).delete().where({ id: req.params.id });
      res.sendStatus(204)
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
