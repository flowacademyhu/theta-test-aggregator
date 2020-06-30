import { Statistic } from "../models/statistic";
import { database } from "../../lib/database";
import { Request, Response } from "express";
import { tableName } from "../../lib/tableName";
import * as statisticSerializer from '../serializers/statistic';

export const index = async (req: Request, res: Response) => {

}