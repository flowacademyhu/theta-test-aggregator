import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user-model';
import { ConfirmDeleteModalComponent } from '../../modals/confirm-delete-modal/confirm-delete-modal.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, DoCheck, OnDestroy {

  constructor(private authService: AuthService, private userService: UserService, private dialog: MatDialog, private route: ActivatedRoute) {
  }

  public users: User[];
  public user: User;
  public filterUsers() {
    this.userService.fetchUsers().subscribe((data) => {
      this.users = data.filter(u => u.id !== this.user.id);
    })
  }

  public toggleDeleteModal(user) {
    const git_userToDelete = this.users.find(u => u.id === user.id).git_user;
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      data: { git_user: git_userToDelete}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterUsers();
      }
    })
  }

  public toggleAddUserModal() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      height: '500px',
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.filterUsers();
    })
  }

  public toggleUpdateModal(userToDelete) {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: {user: userToDelete}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.filterUsers();
    })
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.authService.getCurrentUser().subscribe((data) => {
        this.user = data;
      })
      this.users = data.users.filter(u => u.id !== localStorage.getItem('id'));
    })
  }


  ngDoCheck(): void {
  }

  ngOnDestroy(): void {
  }

}
