import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user-model';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService, private eref: ElementRef) {
  }

  public users$: Observable<User[]> = this.userService.users;
  public openModal: boolean = false;

  public toggleModal() {
    this.openModal = !this.openModal;
  }

  public clickOutside() {
    this.openModal = false;
  }

  public onDelete(id: string) {
    console.log(id);
    this.userService.deleteUser(id)
    .subscribe((user) => {});
  }

  @HostListener('document:click', ['$event'])
  public onClick(event) {
    if (!this.eref.nativeElement.contains(event.target)) {
      this.openModal = false;
    }
  }


  ngOnInit(): void {
    this.userService.fetchUsers();
  }

  ngDoCheck(): void {
  }

}
