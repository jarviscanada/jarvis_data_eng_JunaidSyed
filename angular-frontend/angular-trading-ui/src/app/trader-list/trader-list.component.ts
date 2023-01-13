import { Component } from '@angular/core';
import { TraderListService } from './trader-list.service';

@Component({
  selector: 'app-trader-list',
  templateUrl: './trader-list.component.html',
  styleUrls: ['./trader-list.component.css'],
})
export class TraderListComponent {
  dataSource;
  displayedColumns;

  constructor(private traderListService: TraderListService) {
    this.dataSource = traderListService.getDataSource();
    this.displayedColumns = traderListService.getColumns();
  }
  onDeleteTrader(id: number) {
    this.traderListService.deleteTrader(id);
    this.dataSource = [...this.traderListService.getDataSource()];
  }
  onAddTrader(
    firstName: string,
    lastName: string,
    dob: string,
    country: string,
    email: string
  ) {
    this.traderListService.addTrader(firstName, lastName, dob, country, email);
    this.dataSource = [...this.traderListService.getDataSource()];
  }
}
