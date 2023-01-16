export interface DialogData {
  firstName: string;
  lastName: string;
  dob: string;
  country: string;
  email: string;
}

export interface Trader {
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

export interface Quote {
  key: string;
  id: number;
  ticker: string;
  lastPrice: number;
  bidPrice: number;
  bidSize: number;
  askPrice: number;
  askSize: number;
}
