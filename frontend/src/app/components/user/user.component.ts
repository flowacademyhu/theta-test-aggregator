import { Component, OnInit, DoCheck } from '@angular/core';
import { User, UserRole } from 'src/app/models/user.model';
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

  public user: User = this.userService.fetchUser("user1");

  public toggleProfileUpdateModal(userToDelete) {
    const dialogRef = this.dialog.open(ProfileUpdateModalComponent, {
      data: {user: userToDelete}
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.user = this.userService.fetchUser("user1");
    }

}
