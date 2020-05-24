import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from './services/account.service';
import { Stock } from './services/stock.model';
import { StocksService } from './services/stocks.service';
import { AlertService } from './services/alert.service';

/**
 * Displays the portfolio page.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    StocksService
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  refresh: boolean = true;
  stocks: Array<Stock> = [];
  interval: any;

  /**
   * Initializes the dependencies.
   * 
   * @param accountService the account service
   * @param stocksService the stocks service
   * @param alertService the alert service
   */
  constructor(public accountService: AccountService, private stocksService: StocksService, private alertService: AlertService) { }

  /**
   * Performed after construction to fetch the data to display.
   */
  ngOnInit(): void {
    this.load();
    this.accountService.init();

    this.interval = setInterval(() => {
      if (this.refresh) {
        this.load();
      }
    }, 15000);
  }

  /**
   * Toggles the refresh flag.
   */
  toggleRefresh(): void {
    this.refresh = !this.refresh;
    let onOff = (this.refresh) ? 'on' : 'off';
    this.alertService.alert(`You have turned automatic refresh ${onOff}`, 'info', 0);
  }

  /**
   * Clears the refresh timer.
   */
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  /**
   * Resets the protfolio to default values.
   */
  reset(): void {
    this.accountService.reset();
    this.alertService.alert(`You have reset your portfolio!`);
  }

  /**
   * Collects stock data for display.
   */
  private load(): void {
    this.stocksService.getStocks().subscribe(stocks => {
      this.stocks = stocks;
    }, error => {
      console.error(`There was an error loading stocks: ${error}`);
    });
  }
}