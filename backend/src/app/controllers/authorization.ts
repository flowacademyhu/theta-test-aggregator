import { Request, Response, NextFunction } from "express";

export const authorization = (req: Request, res: Response, next: NextFunction) => {
  if(['admin'].includes(res.locals.user.role)) {
    next();
  } else {
    res.sendStatus(403);
  }
}