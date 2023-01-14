import { Component, OnInit } from '@angular/core';
import { TraderListService } from './trader-list.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/types/types';
import { NewTraderDialogueComponent } from '../new-trader-dialogue/new-trader-dialogue.component';

@Component({
  selector: 'app-trader-list',
  templateUrl: './trader-list.component.html',
  styleUrls: ['./trader-list.component.css'],
})
export class TraderListComponent {
  dataSource: any;
  displayedColumns;

  constructor(
    private traderListService: TraderListService,
    public dialog: MatDialog
  ) {
    this.dataSource;
    this.displayedColumns = traderListService.getColumns();
  }

  ngOnInit() {
    this.refreshTable();
  }
  refreshTable() {
    this.traderListService.getDataSource().subscribe((res) => {
      this.dataSource = [...res];
    });
  }
  onDeleteTrader(id: number) {
    this.traderListService.deleteTrader(id);
    this.refreshTable();
  }

  onEditTrader(id: number) {
    let trader = this.traderListService.getTraderById(id);
    let data: DialogData = {
      firstName: trader.firstName,
      lastName: trader.lastName,
      country: trader.country,
      email: trader.email,
      dob: trader.dob,
    };
    const dialogRef = this.dialog.open(NewTraderDialogueComponent, {
      data: { id, ...data },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.traderListService.editTrader(result);
      this.refreshTable();
    });
  }
}
