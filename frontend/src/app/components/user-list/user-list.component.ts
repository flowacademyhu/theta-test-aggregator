import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user-model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteModalComponent } from '../../modals/confirm-delete-modal/confirm-delete-modal.component';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService, private dialog: MatDialog) {
  }

  public users: User[];
  subscriptions$: Subscription[] = [];

  public toggleDeleteModal(user) {
    const git_userToDelete = this.users.find(u => u.id === user.id).git_user;
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      data: { git_user: git_userToDelete}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id);
      }
    })
  }

  public toggleUpdateModal(userToDelete) {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: {user: userToDelete}
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }


  ngOnInit(): void {
    this.users = this.userService.fetchOtherUsers(JSON.parse(localStorage.getItem('user')).id);
  }

  ngDoCheck(): void {
    this.users = this.userService.fetchOtherUsers(JSON.parse(localStorage.getItem('user')).id);
  }

}
