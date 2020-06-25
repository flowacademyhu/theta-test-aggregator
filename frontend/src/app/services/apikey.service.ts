import { Injectable } from '@angular/core';
import { ApiKey } from '../models/apiKey-model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApikeyService {

  constructor() { }

  public apikeys: ApiKey[] = [
    {
      id: 1,
      key: 'abc123',
      expires_at: '20210101',
      created_at: '20200624'
    },
    {
      id: 2,
      key: 'abc123',
      expires_at: '20210102',
      created_at: '20200625'
    }
  ]

  apikeys$: BehaviorSubject<ApiKey[]> = new BehaviorSubject<ApiKey[]>(this.apikeys);

  public deleteApiKey (id: number) {
    const index: number = this.apikeys.findIndex(u => u.id === id);
    this.apikeys.splice(index, 1);
    this.apikeys$.next([...this.apikeys]);
  }

  public fetchOtherApiKeys(id: number): ApiKey[] {
    return [...this.apikeys].filter(u => u.id !== id);
  }

  public fetchApiKeys(): ApiKey[] {
    return [...this.apikeys];
  }

  public addApiKey(apikey: ApiKey) {
    this.apikeys.push(apikey);
    this.apikeys$.next([...this.apikeys]);
  }

  public updateApiKey(id: number, apikey: ApiKey) {
    const index = this.apikeys.findIndex(u => u.id === id);
    this.apikeys[index] = apikey;
    this.apikeys$.next([...this.apikeys]);
  }
}
