import { Component, OnInit, DoCheck, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user-model';
import { ConfirmDeleteModalComponent } from 'src/app/modals/confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService, private eref: ElementRef) {
  }

  public users: User[];
  public openModal: boolean = false;

  public toggleModal() {
    this.openModal = !this.openModal;
  }

  public clickOutside() {
    this.openModal = false;
  }

  public onDelete(index: number) {
    this.userService.deleteUser(index);
  }

  @HostListener('document:click', ['$event'])
  public onClick(event) {
    if (!this.eref.nativeElement.contains(event.target)) {
      this.openModal = false;
    }
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.users = this.userService.fetchUsers();
  }

}
