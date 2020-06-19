import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('user')).git_user);
  }

}
