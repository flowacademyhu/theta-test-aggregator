import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User, UserRole } from 'src/app/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private userService: UserService) { }

  public user: User;
  public roles: UserRole[] =[UserRole.ADMIN, UserRole.USER];
  public updateForm: FormGroup;
  public errors: string[] = [];

  public onUpdate() {
    this.errors = null;
    this.userService.updateUser(this.user.id, this.updateForm.value)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      })
    ).subscribe((value) => {
    },
    (error: string[]) => {
      this.errors = error;
    })
    this.userService.fetchUsers();
  }

  ngOnInit(): void {
    this.user = this.data.user;

    this.updateForm = new FormGroup ({
      password: new FormControl(this.user.password, [Validators.minLength(8)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      git_user: new FormControl(this.user.git_user, [Validators.required, Validators.pattern(/^\S*$/)]),
      role: new FormControl(this.user.role, [Validators.required]),
      notification: new FormControl(this.user.notification, [Validators.required]),
      google_auth: new FormControl(this.user.google_auth)
    })
  }

}
