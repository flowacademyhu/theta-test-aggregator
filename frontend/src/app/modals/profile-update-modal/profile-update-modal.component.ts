import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-update-modal',
  templateUrl: './profile-update-modal.component.html',
  styleUrls: ['./profile-update-modal.component.css']
})
export class ProfileUpdateModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private userService: UserService) { }

  public user: User;
  public updateForm: FormGroup;

  public onUpdate() {
    this.userService.updateUser(this.user.id, this.updateForm.value);
  }

  ngOnInit(): void {
    this.user = this.data.user;
    this.updateForm = new FormGroup({
      id: new FormControl(this.user.id),
      git_user: new FormControl(this.user.git_user),
      role: new FormControl(this.user.role),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(8)]),
      notification: new FormControl(this.user.notification, [Validators.required])
    })
  }

}
