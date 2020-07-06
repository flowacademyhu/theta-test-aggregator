import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-invalidate-modal',
  templateUrl: './confirm-invalidate-modal.component.html',
  styleUrls: ['./confirm-invalidate-modal.component.css']
})
export class ConfirmInvalidateModalComponent implements OnInit {
  commit_hash: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    this.commit_hash = this.data.commit_hash;
  }
}
