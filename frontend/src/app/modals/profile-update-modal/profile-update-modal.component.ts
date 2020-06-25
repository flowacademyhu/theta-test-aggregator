import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-profile-update-modal',
  templateUrl: './profile-update-modal.component.html',
  styleUrls: ['./profile-update-modal.component.css']
})
export class ProfileUpdateModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data, private userService: UserService, private authService: AuthService) { }

  public user: User;
  public updateForm: FormGroup;
  public errors: string[];

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
  }

  ngOnInit(): void {
    this.user = this.data.user;

    this.updateForm = new FormGroup ({
      password: new FormControl(this.user.password, [Validators.minLength(8)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      git_user: new FormControl(this.user.git_user),
      role: new FormControl(this.user.role),
      notification: new FormControl(this.user.notification, [Validators.required]),
      google_auth: new FormControl(this.user.google_auth)
    })
  }

}
