import { Request, Response, NextFunction } from "express";
import { userRole } from "../models/user"

export const authorization = (req: Request, res: Response, next: NextFunction) => {
  if(userRole.ADMIN.includes(res.locals.user.role)) {
    next();
  } else {
    res.sendStatus(403);
  }
}