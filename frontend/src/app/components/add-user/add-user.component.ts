import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserRole } from 'src/app/models/user.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,  private userService: UserService) { }

  roles: UserRole[] = [UserRole.ADMIN, UserRole.USER];
  public errors: string[] = [];

  public addForm: FormGroup  = new FormGroup({
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    git_user: new FormControl(null, [Validators.required, Validators.pattern(/^\S*$/)]),
    role: new FormControl(null, [Validators.required]),
    notification: new FormControl(null, [Validators.required])
  });

  public onAdd() {
    this.userService.addUser(this.addForm.value).pipe( catchError((error: HttpErrorResponse) => {
      return throwError(error.error.message);
    })).subscribe((data) => {}, (error) => {this.errors = error});
    this.userService.fetchUsers();
  }

  ngOnInit(): void {
  }
}
