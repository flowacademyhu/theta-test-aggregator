import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
<<<<<<< HEAD
    console.log(JSON.parse(sessionStorage.getItem('user')).git_user);
=======
    console.log(JSON.parse(localStorage.getItem('user')).git_user);
>>>>>>> master
  }

}
