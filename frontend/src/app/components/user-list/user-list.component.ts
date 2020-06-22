import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user-model';
import { Observable } from 'rxjs';
import { ConfirmDeleteModalComponent } from '../../modals/confirm-delete-modal/confirm-delete-modal.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, DoCheck, OnDestroy {

  constructor(
    private userService: UserService, 
    private dialog: MatDialog, 
    private authService: AuthService,
    private route: ActivatedRoute) {
  }

  public user$: Observable<User>;
  public users: User[];
  public user: User;

  public toggleDeleteModal(user) {
    console.log(this.users);
    const git_userToDelete = this.users.find(u => u.id === user.id).git_user;
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      data: { git_user: git_userToDelete}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id).subscribe(() => {
          this.userService.fetchUsers().subscribe((data) => {
            this.users = data.filter(u => u.id !== this.user.id);
          })
        })
      }
    })
  }

  public toggleAddUserModal() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      height: '500px',
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.userService.fetchUsers().subscribe((data) => {
        this.users = data.filter(u => u.id !== this.user.id);
      })
    })
  }

  public toggleUpdateModal(userToUpdate) {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: {user: userToUpdate}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.userService.fetchUsers().subscribe((data) => {
        this.users = data.filter(u => u.id !== this.user.id);
      })
    })
  }


  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.authService.getCurrentUser().subscribe((data) => {
        this.user = data;
      });
      this.users = data.users.filter(u => u.id !== localStorage.getItem('id'));
    })
  }


  ngDoCheck(): void {
  }

  ngOnDestroy(): void {
  }

  

}
