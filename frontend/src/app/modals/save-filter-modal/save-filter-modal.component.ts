import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  filterName: string;
}

@Component({
  selector: 'app-save-filter-modal',
  templateUrl: './save-filter-modal.component.html',
  styleUrls: ['./save-filter-modal.component.css']
})

export class SaveFilterModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SaveFilterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
