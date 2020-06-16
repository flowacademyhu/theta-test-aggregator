import { Users } from "../models/users";

export interface UsersSerializer {
  password_hash: string;
  email: string;
  git_user: string;
  role: 'admin' | 'user';
  notification: boolean;
  
}

export const show = (users: Users): UsersSerializer => {
  return {
    password_hash: users.password_hash,
    email: users.email,
    git_user: users.git_user,
    role: users.role,
    notification: users.notification
  }
};

export const index = (users: Array<Users>): Array<UsersSerializer> => {
  return users.map((users: Users) => show(users));
}