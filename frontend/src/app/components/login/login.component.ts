import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });

  private loggedInUser: User;
  public isChecked = false;

  public login() {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password, this.isChecked)
      .then(() => {
        this.router.navigate(['logged-in']).then(r => {
          console.log('Successful login');
        });
      })
      .catch(() => {
        console.log('Wrong email or password');
      });
  }

  rememberMe() {
    this.isChecked = !this.isChecked;
  }

  ngOnInit(): void {
  }
}
