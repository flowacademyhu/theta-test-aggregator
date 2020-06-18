import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = JSON.parse(localStorage.getItem("user"));
  role: string;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService)  {
    authService.users.toString
  }

 ngOnInit(): void {  
   this.role = this.readLocalStorageValue('role');  
 }

 readLocalStorageValue(key: string): string {
   return localStorage.getItem(key);
}
}
