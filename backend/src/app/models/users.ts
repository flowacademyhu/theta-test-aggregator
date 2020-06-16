export interface Users {
  id?: string;
  password_hash?: string;
  email?: string;
  git_user?: string;
  role?: userRoles;
  notification?: boolean;
  created_at?: string;
  updated_at?: string
}

enum userRoles {
  ADMIN,
  USER
}