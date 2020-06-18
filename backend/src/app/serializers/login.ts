import { User } from "../models/user";
import * as userSerializer from './user';

interface LoginSerializer {
  token: string;
  user: userSerializer.UserSerializer
}

export const create = (token: string, user: User): LoginSerializer => {
  return {
    token: token,
    user: userSerializer.show(user)
  }
}