import { Injectable } from '@angular/core';

interface Trader {
  key: string;
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  country: string;
  email: string;
  amount: number;
  actions: string;
}

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
      key: '1',
      id: 1,
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

  getDataSource(): Trader[] {
    return this.traderList;
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
