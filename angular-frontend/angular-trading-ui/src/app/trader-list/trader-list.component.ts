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

  constructor(traderListService: TraderListService) {
    this.dataSource = traderListService.getDataSource();
    this.displayedColumns = traderListService.getColumns();
  }
}
