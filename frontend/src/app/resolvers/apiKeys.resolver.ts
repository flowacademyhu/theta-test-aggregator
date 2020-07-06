import { Injectable } from '@angular/core';
import {
  Resolve, ActivatedRouteSnapshot, RouterStateSnapshot,
} from '@angular/router';
import { ApikeyService } from '../services/apikey.service';

@Injectable({ providedIn: 'root' })
export class ApiKeyResolver implements Resolve<any> {
  constructor(private apiKeyService: ApikeyService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.apiKeyService.fetchApiKeys();
  }
}
