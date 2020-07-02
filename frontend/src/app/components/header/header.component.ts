import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { User } from 'src/app/models/user.model';
declare let require: any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: User;
  public userpic;

  constructor(private authService: AuthService) { }

  public onSignOut() {
    this.authService.logout();
    this.user = null;
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((data) => this.user = data);
  }

  getUserPic() {
    if (!(localStorage.getItem('pics'))) {
      this.userpic = require("../../../assets/avatar.png");
    } else {
      this.userpic = localStorage.getItem('pics')
    }
  }
}
