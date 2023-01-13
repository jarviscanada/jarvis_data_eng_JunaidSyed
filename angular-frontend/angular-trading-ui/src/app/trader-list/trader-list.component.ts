import { Component, OnInit } from '@angular/core';
import { TraderListService } from './trader-list.service';
import { MatTableDataSource } from '@angular/material/table';
import { Trader } from 'src/types/types';

@Component({
  selector: 'app-trader-list',
  templateUrl: './trader-list.component.html',
  styleUrls: ['./trader-list.component.css'],
})
export class TraderListComponent {
  dataSource: any;
  displayedColumns;

  constructor(private traderListService: TraderListService) {
    this.dataSource;
    this.displayedColumns = traderListService.getColumns();
  }

  ngOnInit() {
    this.refreshTable();
  }
  refreshTable() {
    this.traderListService.getDataSource().subscribe((res) => {
      console.log(res);
      this.dataSource = [...res];
    });
  }
  onDeleteTrader(id: number) {
    this.traderListService.deleteTrader(id);
    this.refreshTable();
  }
}
