import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.css']
})
export class ConfirmDeleteModalComponent implements OnInit {
  @Input() public git_user: string ;
  @Output() public close: EventEmitter<void> = new EventEmitter<void>();
  @Output() public confirm: EventEmitter<void> = new EventEmitter<void>();


  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.close.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }

}
