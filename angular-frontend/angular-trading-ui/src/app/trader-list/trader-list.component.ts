import { Component, OnInit } from '@angular/core';
import { TraderListService } from './trader-list.service';
import { MatDialog } from '@angular/material/dialog';
import { NewTraderDialogComponent } from '../new-trader-dialog/new-trader-dialog.component';

@Component({
  selector: 'app-trader-list',
  templateUrl: './trader-list.component.html',
  styleUrls: ['./trader-list.component.css'],
})
export class TraderListComponent {
  dataSource: any[] = [];
  displayedColumns: string[] = [];

  constructor(
    private traderListService: TraderListService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.displayedColumns = this.traderListService.getColumns();
    this.refreshTable();
  }

  refreshTable() {
    this.traderListService.getDataSource().subscribe((dataSource) => {
      this.dataSource = dataSource;
    });
  }

  onDeleteTrader(id: number) {
    this.traderListService
      .deleteTrader(id)
      .subscribe((_) => this.refreshTable());
  }

  onEditTrader(id: number) {
    let trader = this.traderListService.getTraderById(id);
    let data = {
      firstName: trader.firstName,
      lastName: trader.lastName,
      country: trader.country,
      email: trader.email,
      dob: trader.dob,
    };
    const dialogRef = this.dialog.open(NewTraderDialogComponent, {
      data: { id, ...data },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.traderListService
        .deleteTrader(result.id)
        .subscribe((_) =>
          this.traderListService
            .addTrader(result)
            .subscribe((_) => this.refreshTable())
        );
    });
  }

  onAddTrader(): void {
    let data = {
      firstName: '',
      lastName: '',
      country: '',
      email: '',
      dob: '',
    };
    const dialogRef = this.dialog.open(NewTraderDialogComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.traderListService
        .addTrader(result)
        .subscribe((_) => this.refreshTable());
    });
  }
}
