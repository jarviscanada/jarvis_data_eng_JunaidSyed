import { Component } from '@angular/core';
import { QuotesService } from './quotes.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css'],
})
export class QuotesComponent {
  dataSource: any[] = [];
  displayedColumns: string[] = [];

  constructor(private quotesService: QuotesService) {}

  ngOnInit() {
    this.displayedColumns = this.quotesService.getColumns();
    this.refreshTable();
  }

  refreshTable() {
    this.quotesService.getDataSource().subscribe((dataSource) => {
      this.dataSource = dataSource;
    });
  }
}
