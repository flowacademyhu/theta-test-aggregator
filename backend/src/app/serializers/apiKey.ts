import { ApiKey } from "../models/apiKey";

export interface ApiKeySerializer {
  id: number;
  key: string;
  expires_at: string;
  created_at: string;
  
}

export const show = (apiKey: ApiKey): ApiKey => {
  return {
    id: apiKey.id,
    key: apiKey.key,
    expires_at: apiKey.expires_at,
    created_at: apiKey.created_at
  }
};

export const index = (apiKey: Array<ApiKey>): Array<ApiKey> => {
  return apiKey.map((apiKey: ApiKey) => show(apiKey));
}