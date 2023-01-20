import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-amount-dialog',
  templateUrl: './amount-dialog.component.html',
  styleUrls: ['./amount-dialog.component.css'],
})
export class AmountDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AmountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
