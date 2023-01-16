import { Injectable } from '@angular/core';
import { Quote } from 'src/types/types';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private quoteList: Quote[] = [
    {
      key: '1',
      id: 1,
      ticker: 'FB',
      lastPrice: 200,
      bidPrice: 0,
      bidSize: 0,
      askPrice: 0,
      askSize: 0,
    },
    {
      key: '2',
      id: 2,
      ticker: 'AAPL',
      lastPrice: 400,
      bidPrice: 0,
      bidSize: 0,
      askPrice: 0,
      askSize: 0,
    },
  ];
  constructor() {}

  getDataSource(): Observable<Quote[]> {
    return of(this.quoteList);
  }

  getColumns(): string[] {
    return [
      'Ticker',
      'Last Price',
      'Bid Price',
      'Bid Size',
      'Ask Price',
      'Ask Size',
    ];
  }
}
