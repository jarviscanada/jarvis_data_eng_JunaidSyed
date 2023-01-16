import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trader } from 'src/types/types';
import { TraderListService } from '../trader-list/trader-list.service';
import { MatDialog } from '@angular/material/dialog';
import { AmountDialogComponent } from '../amount-dialog/amount-dialog.component';

@Component({
  selector: 'app-trader-account',
  templateUrl: './trader-account.component.html',
  styleUrls: ['./trader-account.component.css'],
})
export class TraderAccountComponent {
  traderId: string;
  trader: Trader;
  constructor(
    private activatedRoute: ActivatedRoute,
    private traderListService: TraderListService,
    public dialog: MatDialog
  ) {
    this.traderId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.trader = this.traderListService.getTraderById(parseInt(this.traderId));
  }

  onDeposit() {
    let amount: number = 0;
    const dialogRef = this.dialog.open(AmountDialogComponent, {
      data: { amount },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.traderListService.updateAmount(
        this.trader.id,
        parseInt(result.amount)
      );
      this.trader = this.traderListService.getTraderById(
        parseInt(this.traderId)
      );
    });
  }

  onWithdraw() {
    let amount: number = 0;
    const dialogRef = this.dialog.open(AmountDialogComponent, {
      data: { amount },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.traderListService.updateAmount(
        this.trader.id,
        -parseInt(result.amount)
      );
      this.trader = this.traderListService.getTraderById(
        parseInt(this.traderId)
      );
    });
  }
}
