import { User } from "../models/user";
import { userRole } from "../../lib/enums"

export interface UserSerializer {
  id: string;
  email: string;
  git_user: string;
  role: userRole;
  notification: boolean;
  
}

export const show = (user: User): UserSerializer => {
  return {
    id: user.id,
    email: user.email,
    git_user: user.git_user,
    role: user.role,
    notification: user.notification
  }
};

export const index = (users: Array<User>): Array<UserSerializer> => {
  return users.map((user: User) => show(user));
}