import { Component, Input } from '@angular/core';
import { AccountService } from '../services/account.service';

/**
 * Displays stock data in the 'All Stocks' section.
 */
@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent {

  /**
   * The array of stocks provided by the parent component
   */
  @Input() stocks: any;

  /**
   * Initializes the account service.
   * 
   * @param accountService the accoutn service
   */
  constructor(private accountService: AccountService) { }

  /**
   * Performs a purchase of the given stock.
   * 
   * @param stock the stock to buy
   */
  buy(stock): void {
    this.accountService.purchase(stock);
  }
}