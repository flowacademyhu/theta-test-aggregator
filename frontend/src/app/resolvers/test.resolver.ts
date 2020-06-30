import { Injectable } from '@angular/core';
import {
  Resolve, ActivatedRouteSnapshot, RouterStateSnapshot,
} from '@angular/router';
import { TestService } from '../services/test.service';

@Injectable({ providedIn: 'root' })
export class TestResolver implements Resolve<any> {
  constructor(private testService: TestService) {}

  public resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.testService.fetchTest(route.params.id);
  }
}
