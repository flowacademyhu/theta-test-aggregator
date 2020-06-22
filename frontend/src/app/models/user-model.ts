export interface User {
  id: string;
  password_hash: string;
  email: string;
  git_user: string;
  role: UserRole;
  notification: boolean;
  google_auth?: any;
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin"
}