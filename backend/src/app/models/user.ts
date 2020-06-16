export interface User {
  id?: string;
  password_hash?: string;
  email?: string;
  git_user?: string;
  role?: userRole;
  notification?: boolean;
  created_at?: string;
  updated_at?: string
}

enum userRole {
  ADMIN = 'admin',
  USER = 'user'
}