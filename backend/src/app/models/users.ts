export interface Users {
  id?: string;
  password_hash?: string;
  email?: string;
  git_user?: number;
  role?: 'admin' | 'user';
  notification?: boolean;
  created_at?: string;
  updated_at?: string
}