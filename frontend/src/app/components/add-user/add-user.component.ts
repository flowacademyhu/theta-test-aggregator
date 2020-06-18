import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  public addForm: FormGroup;
  public user: User;

  public onAdd() {
    let myBool: boolean;
    if (this.addForm.get('notification').value === 'true') {
      myBool = true;
    } else if (this.addForm.get('notification').value === 'false') {
      myBool = false;
    }
    this.user = {
      id: this.addForm.value.id,
      password: this.addForm.value.password,
      email: this.addForm.value.email,
      git_user: this.addForm.value.git_user,
      role: this.addForm.value.role,
      notification: myBool
    }
    this.userService.addUser(this.user);
  }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      git_user: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required]),
      notification: new FormControl(null, [Validators.required])
    })
  }

}
