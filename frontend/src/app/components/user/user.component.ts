import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ProfileUpdateModalComponent } from 'src/app/modals/profile-update-modal/profile-update-modal.component';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public dialog: MatDialog, private userService: UserService) { }

  public user: User;
  public image;

  public toggleProfileUpdateModal(userToUpdate) {
    const dialogRef = this.dialog.open(ProfileUpdateModalComponent, {
      data: { user: userToUpdate }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.userService.fetchUser('profile').subscribe((data) => {
        this.user = data;
      });
    });
  }

  ngOnInit(): void {
    this.userService.fetchUser('profile').subscribe((data) => {
      this.user = data;
    });
    if (localStorage.getItem('pic') != undefined) {
      this.image = localStorage.getItem('pic').toString();
      console.log(this.image)
    } else {
      this.image = "../../../assets/avatar.png";
    }
  }
}
