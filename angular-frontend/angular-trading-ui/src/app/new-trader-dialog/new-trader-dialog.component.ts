import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-trader-dialog',
  templateUrl: './new-trader-dialog.component.html',
  styleUrls: ['./new-trader-dialog.component.css'],
})
export class NewTraderDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NewTraderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
