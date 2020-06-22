import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user;

  constructor(private authService: AuthService) { }

  public onSignOut() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((data) => this.user = data);
  }

}
