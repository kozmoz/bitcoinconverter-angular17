import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CONVERT_DIR, CURRENCY, LOADING_STATUS} from "../../domain/enums";
import {TickerPrice, TickerService} from "../../services/ticker.service";
import {NgIf} from "@angular/common";
import {roundFilter} from "../../filters/number-filters";
import {dateFilter, timeFilter} from "../../filters/date-filters";

@Component({
  selector: 'app-conversion-result',
  standalone: true,
  imports: [
    NgIf
  ],
  template: `
    <div class="converter-block-result bg-white text-center px-3 py-3 my-3">
      <div *ngIf="tickerPrice">
        <h3>
          <span *ngIf="direction === CONVERT_DIR.TO_BTC">
            {{ getCurrencyLabel() }} {{ amount || 0 }} = {{ roundFilter(calculatedResult(), 5, LOCALE) }}
            BTC
          </span>
          <span *ngIf="direction !== CONVERT_DIR.TO_BTC">
            {{ amount || 0 }} BTC = {{ roundFilter(calculatedResult(), 2, LOCALE) }}
            {{ getCurrencyLabel() }}
          </span>
        </h3>
        <p class="mb-0">
          <small class="text-muted">The exchange rate updates every minute</small>
        </p>
        <p class="mb-0">
          <small class="text-muted">
            Last update at
            {{ timeFilter(tickerPrice.updated) }} {{ dateFilter(tickerPrice.updated, LOCALE) }}, 1 BTC =
            {{ getCurrencyLabel() }}
            {{ roundFilter(tickerPriceActiveCurrency(), 2, LOCALE) }} (buy)
          </small>
        </p>
      </div>

      <div *ngIf="loadingStatus === LOADING_STATUS.LOADING">
        Loading/updating exchange rates...
      </div>

      <div *ngIf="loadingError" class="alert alert-danger mb-0" role="alert">
        {{ loadingError }}
      </div>

    </div>
  `,
  styleUrl: './conversion-result.component.css'
})
export class ConversionResultComponent implements OnDestroy, OnInit {

  LOCALE = 'en_US';

  @Input()
  amount!: number;

  @Input()
  currency!: CURRENCY;

  @Input()
  direction!: CONVERT_DIR;

  loadingStatus: LOADING_STATUS = LOADING_STATUS.NOT_LOADING;
  loadingError: string = '';
  tickerPrice: TickerPrice | null = null;

  cancelId: number = 0;

  constructor(private tickerService: TickerService) {

  }

  ngOnInit() {
    // noinspection JSIgnoredPromiseFromCall
    /**
     * Update the BTC price on interval.
     */
    this.loadPrices();
    this.cancelId = setInterval(this.loadPrices, 60000 /* One minute. */) as unknown as number;
  }

  ngOnDestroy() {
    clearInterval(this.cancelId);
  }

  getCurrencyLabel() {
    return this.currency == 'EUR' ? '€' : '$';
  }

  /**
   * Calculate new price when something changes.
   */
  calculatedResult(): number {
    if (!this.amount || !this.tickerPriceActiveCurrency) {
      return 0;
    }
    return this.direction === CONVERT_DIR.FROM_BTC ?
      this.amount * this.tickerPriceActiveCurrency() : this.amount / this.tickerPriceActiveCurrency();
  }

  /**
   * Determine the ticker price for the active currency.
   */
  tickerPriceActiveCurrency(): number {
    if (!this.tickerPrice) {
      return 0;
    }
    return this.currency === CURRENCY.EUR ? this.tickerPrice.rateEUR : this.tickerPrice.rateUSD;
  }

  /**
   * Load the ticker prices.
   */
  async loadPrices(): Promise<void> {
    this.loadingStatus = LOADING_STATUS.LOADING;
    try {
      this.tickerPrice = await this.tickerService.fetchCoinDeskCurrentPrice();
      this.loadingError = '';
      this.loadingStatus = LOADING_STATUS.NOT_LOADING;
    } catch (error) {
      this.loadingError = `${error}`;
      this.loadingStatus = LOADING_STATUS.ERROR;
    }
  }


  // We need these constants in the template.
  protected readonly roundFilter = roundFilter;
  protected readonly CONVERT_DIR = CONVERT_DIR;
  protected readonly timeFilter = timeFilter;
  protected readonly dateFilter = dateFilter;
  protected readonly LOADING_STATUS = LOADING_STATUS;
}
