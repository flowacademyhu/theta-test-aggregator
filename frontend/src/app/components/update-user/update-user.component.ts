import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  public user: User;
  public updatedUser;
  public notify: boolean = true;
  public noNotify: boolean = false;

  public updateForm: FormGroup;

  public onUpdate() {
    let myBool: boolean;
    if (this.updateForm.get('notification').value === "true") {
      myBool = true;
    } else if (this.updateForm.get('notification').value === "false") {
      myBool = false;
    }
    this.updatedUser = this.updateForm.value;
    this.updatedUser.notification = myBool;
    this.userService.updateUser(this.user.id, this.updatedUser);
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.user = data.user;
    });

    this.updateForm = new FormGroup ({
      id: new FormControl(this.user.id, [Validators.required]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(8)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      git_user: new FormControl(this.user.git_user, [Validators.required]),
      role: new FormControl(this.user.role, [Validators.required]),
      notification: new FormControl(this.user.notification, [Validators.required]),
      google_auth: new FormControl(this.user.google_auth)
    })
  }

}
