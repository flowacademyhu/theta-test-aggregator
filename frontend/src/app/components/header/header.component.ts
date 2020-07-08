import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: User;
  public image;

  constructor(private authService: AuthService) { }

  public onSignOut() {
    this.authService.logout();
    this.user = null;
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((data) => this.user = data);
    if (sessionStorage.getItem('pic')) {
      this.image = (sessionStorage.getItem('pic')).toString()
      console.log(this.image)
    } else {
      this.image = "../../../assets/avatar.png"
    }
  }
}
