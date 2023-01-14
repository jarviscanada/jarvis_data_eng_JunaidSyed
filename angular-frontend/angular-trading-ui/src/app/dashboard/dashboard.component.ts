import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewTraderDialogueComponent } from '../new-trader-dialogue/new-trader-dialogue.component';
import { TraderListService } from '../trader-list/trader-list.service';
import { DialogData } from 'src/types/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(
    private traderListService: TraderListService,
    public dialog: MatDialog
  ) {}

  openDialog(): void {
    let data: DialogData = {
      firstName: '',
      lastName: '',
      country: '',
      email: '',
      dob: '',
    };
    const dialogRef = this.dialog.open(NewTraderDialogueComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      this.traderListService.addTrader(result);
    });
  }
}
