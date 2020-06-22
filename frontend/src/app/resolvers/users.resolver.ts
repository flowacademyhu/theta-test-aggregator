import { Injectable } from '@angular/core';
import {
  Resolve, ActivatedRouteSnapshot, RouterStateSnapshot,
} from '@angular/router';
import { User } from '../models/user-model';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class UsersResolver implements Resolve<any> {
  constructor(private userService: UserService) {}

  public resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.fetchUsers();
  }
}