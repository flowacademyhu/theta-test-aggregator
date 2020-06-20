import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { User } from '../../models/user-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: User;
  public role: string;

  public onSignOut() {
    this.authService.logout();
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe((value) => {
      this.user = value;
    })
  }

}
