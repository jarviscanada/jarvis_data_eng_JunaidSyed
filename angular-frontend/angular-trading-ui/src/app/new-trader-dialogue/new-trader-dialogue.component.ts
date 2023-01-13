import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/types/types';

@Component({
  selector: 'app-new-trader-dialogue',
  templateUrl: './new-trader-dialogue.component.html',
  styleUrls: ['./new-trader-dialogue.component.css'],
})
export class NewTraderDialogueComponent {
  constructor(
    public dialogRef: MatDialogRef<NewTraderDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
