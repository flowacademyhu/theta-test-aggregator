import { Request, Response, NextFunction } from "express";
import { userRole } from "../models/user"

export const authorization = (req: Request, res: Response, next: NextFunction) => {
  if(res.locals.user.role == userRole.ADMIN) {
    next();
  } else {
    res.sendStatus(403);
  }
}