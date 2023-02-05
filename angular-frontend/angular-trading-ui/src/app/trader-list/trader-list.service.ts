import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TraderListService {
  private traderList: any[] = [];
  constructor(private http: HttpClient) {}

  addTrader(trader) {
    return this.http.post(
      'https://jarvis-express-trading-app.herokuapp.com/api/traders',
      trader
    );
  }

  deleteTrader(id: number) {
    return this.http.delete(
      'https://jarvis-express-trading-app.herokuapp.com/api/traders/' + id
    );
  }

  // editTrader(trader: any) {
  //   this.deleteTrader(trader.id).subscribe((response) => {
  //     this.addTrader(trader);
  //   });
  // }

  getDataSource(): Observable<any[]> {
    let request = this.http.get<any[]>(
      'https://jarvis-express-trading-app.herokuapp.com/api/traders'
    );
    request.subscribe((dataSource) => {
      this.traderList = dataSource;
    });
    return request;
  }

  getColumns(): string[] {
    return [
      'First Name',
      'Last Name',
      'Email',
      'DateOfBirth',
      'Country',
      'Action',
    ];
  }

  getTraderById(id: number) {
    return this.traderList.find((t) => t.id == id)!;
  }

  updateAmount(id: number, amount: number) {
    let index = this.traderList.findIndex((t) => t.id == id)!;
    this.traderList[index].amount += amount;
  }
}
