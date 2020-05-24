import { Component, DoCheck } from '@angular/core';
import { AccountService } from '../services/account.service';

/**
 * Displays stock data in the 'Your Portfolio' section.
 */
@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements DoCheck {
  cost: number = 0;
  value: number = 0;
  change: number = 0;
  stocks: any = [];

  /**
   * Initializes the account service.
   * 
   * @param accountService the account service
   */
  constructor(public accountService: AccountService) { }

  /**
   * Detects changes between the account data and the displayed data 
   * and adjusts the displayed data to match.
   */
  ngDoCheck() {
    if (this.accountService.stocks.length !== this.stocks.length) {
      this.stocks = this.accountService.stocks;
    }
    if (this.cost !== this.accountService.cost || this.value !== this.accountService.value) {
      this.cost = this.accountService.cost;
      this.value = this.accountService.value;
      this.change = this.accountService.value - this.accountService.cost;
    }
  }

  /**
   * Sells the stock for the given index.
   * 
   * @param index the stock identifier
   */
  sell(index): void {
    this.accountService.sell(index);
  }
}