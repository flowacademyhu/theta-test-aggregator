
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.css']
})
export class ConfirmDeleteModalComponent implements OnInit {

  git_user: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    this.git_user = this.data.git_user;
  }

}
