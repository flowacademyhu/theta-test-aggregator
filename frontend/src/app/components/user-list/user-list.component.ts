import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user-model';
import { Subscription } from 'rxjs';
import { ConfirmDeleteModalComponent } from '../../modals/confirm-delete-modal/confirm-delete-modal.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, DoCheck, OnDestroy {

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

  public toggleAddUserModal() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      height: '500px',
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(result => {
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
    this.subscriptions$.push(this.userService.users$.subscribe(users => {
      this.users = users;
    }));
  }


  ngDoCheck(): void {
    this.users = this.userService.fetchOtherUsers(JSON.parse(localStorage.getItem('user')).id);
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

}
