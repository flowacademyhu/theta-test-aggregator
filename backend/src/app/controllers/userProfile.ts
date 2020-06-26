import { User } from "../models/user";
import { database } from "../../lib/database";
import { Request, Response, NextFunction } from "express";
import * as bcrypt from 'bcrypt';
import { tableName } from '../../lib/tableName';

const updatePassword = (req: Request, user: Partial<User>) => {
  if (req.body.password) {
    const pw = req.body.password;
    const encryptedPassword = bcrypt.hashSync(pw, 10);
    user.password_hash = encryptedPassword;
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const user: Partial<User> = await database(tableName.USERS).select().where({ id: req.params.id }).first();   
    if (user) {
      const newUser: Partial<User> = {
        email: req.body.email,
        git_user: req.body.git_user,
        notification: req.body.notification
      }
      updatePassword(req, newUser);
      await database(tableName.USERS).update(newUser).where({ id: req.params.id });
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const userUpdateAuthorization = (req: Request, res: Response, next: NextFunction) => {
  if(res.locals.user.id === req.params.id) {
    next();
  } else {
    res.sendStatus(403);
  }
};