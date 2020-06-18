import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService, private eref: ElementRef, private router: Router) {
  }

  public users: User[];
  public openModal: boolean = false;

  public toggleModal() {
    this.openModal = !this.openModal;
  }

  public clickOutside() {
    this.openModal = false;
  }

  public onDelete(id: string) {
    console.log(id);
    this.userService.deleteUser(id);
  }

  public update(id: string) {
    this.router.navigate([`users/edit/${id}`]);
  }

  @HostListener('document:click', ['$event'])
  public onClick(event) {
    if (!this.eref.nativeElement.contains(event.target)) {
      this.openModal = false;
    }
  }

  ngOnInit(): void {
    this.users = this.userService.fetchOtherUsers(JSON.parse(localStorage.getItem('user')).id);
    console.log(this.users);
  }

  ngDoCheck(): void {
    this.users = this.userService.fetchOtherUsers(JSON.parse(localStorage.getItem('user')).id);
  }

}
