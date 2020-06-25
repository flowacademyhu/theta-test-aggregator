import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ProfileUpdateModalComponent } from 'src/app/modals/profile-update-modal/profile-update-modal.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, DoCheck {

  constructor(public dialog: MatDialog, private userService: UserService) { }

  public user: User;

  public toggleProfileUpdateModal(userToUpdate) {
    const dialogRef =this.dialog.open(ProfileUpdateModalComponent, {
      data: {user: userToUpdate}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.userService.fetchUser(localStorage.getItem('id')).subscribe((data) => {
        this.user = data
      })
    })
  }

  ngOnInit(): void {
    this.userService.fetchUser(localStorage.getItem('id')).subscribe((data) => {
      this.user = data;
    });
  }

  ngDoCheck(): void {
    this.userService.fetchUser(localStorage.getItem('id')).subscribe((data) => {
      this.user = data;
    })
  }

}
