import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {

  constructor(private authService: AuthService) { }

  public user;

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((data) => {
      this.user = data;
    });
  }

}
