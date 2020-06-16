export interface Users {
  id?: number;
  passwordHash?: string;
  email?: string;
  git_user?: number;
  role?: 'admin' | 'user';
  notification?: boolean;
  created_at?: string;
  updated_at?: string
}