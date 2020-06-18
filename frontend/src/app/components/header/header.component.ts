import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user = JSON.parse(localStorage.getItem('user'));
  public role: string;

  constructor() { }

  ngOnInit(): void {
  }

}
