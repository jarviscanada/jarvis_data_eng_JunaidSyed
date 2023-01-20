import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TraderListService } from '../trader-list/trader-list.service';
import { MatDialog } from '@angular/material/dialog';
import { AmountDialogComponent } from '../amount-dialog/amount-dialog.component';

@Component({
  selector: 'app-trader-account',
  templateUrl: './trader-account.component.html',
  styleUrls: ['./trader-account.component.css'],
})
export class TraderAccountComponent implements OnInit {
  traderId: string = '';
  trader: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private traderListService: TraderListService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
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
