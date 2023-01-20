import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  constructor(private http: HttpClient) {}

  getDataSource() {
    let request = this.http.get<any[]>(
      'https://jarvis-express-trading-app.herokuapp.com/api/quote/dailyList'
    );
    return request;
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
