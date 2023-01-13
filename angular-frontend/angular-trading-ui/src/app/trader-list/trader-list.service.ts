import { Injectable } from '@angular/core';
import { DialogData, Trader } from 'src/types/types';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TraderListService {
  private traderList: Trader[] = [
    {
      key: '1',
      id: 1,
      firstName: 'Sally',
      lastName: 'Harrison',
      dob: new Date().toString(),
      country: 'canada',
      email: 'sally@gmail.com',
      amount: 0,
      actions: '<button (click)="deleteTrader">Delete Trader</button>',
    },
    {
      key: '2',
      id: 2,
      firstName: 'Tom',
      lastName: 'Harrison',
      dob: new Date().toString(),
      country: 'canada',
      email: 'tom@gmail.com',
      amount: 0,
      actions: '<button (click)="deleteTrader">Delete Trader</button>',
    },
  ];
  constructor() {}

  addTrader(data: DialogData) {
    let date = Date.now();
    let trader: Trader = {
      key: date.toString(),
      id: date,
      firstName: data.firstName,
      lastName: data.lastName,
      dob: data.dob,
      country: data.country,
      email: data.email,
      amount: 0,
      actions: '<button (click)="deleteTrader">Delete Trader</button>',
    };
    this.traderList.push(trader);
  }

  deleteTrader(id: number) {
    this.traderList.splice(
      this.traderList.findIndex((trader) => trader.id == id),
      1
    );
  }

  getDataSource(): Observable<Trader[]> {
    return of(this.traderList);
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
}
