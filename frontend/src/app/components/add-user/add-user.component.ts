import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/models/user.model';
import { v4 as uuid } from 'uuid';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,  private userService: UserService, private router: Router) { }

  roles: UserRole[] = [UserRole.ADMIN, UserRole.USER];

  public addForm: FormGroup  = new FormGroup({
    id: new FormControl(uuid(), [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    git_user: new FormControl(null, [Validators.required, Validators.pattern(/^\S*$/)]),
    role: new FormControl(null, [Validators.required]),
    notification: new FormControl(null, [Validators.required])
  });

  public onAdd() {
    console.log(this.addForm.value)
    this.userService.addUser(this.addForm.value);
  }

  ngOnInit(): void {
  }
}
