import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CONVERT_DIR, CURRENCY} from "../domain/enums";
import {SelectCurrencyComponent} from "./select-currency/select-currency.component";
import {SelectConversionDirectionComponent} from "./select-conversion-direction/select-conversion-direction.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SelectCurrencyComponent, SelectConversionDirectionComponent],
  template: `

    <div class="container">
      <div class="row">
        <div class="col converter-block-title text-center text-white">
          <div class="float-right pt-2">
<!--            <select-language/>-->
          </div>
          <h2>{{ title }}</h2>
        </div>
      </div>

      <div class="row py-3 bg-light">
        <div class="col-sm-12 col-md-6">
          <form novalidate autocomplete="off">

            <app-select-currency [(currency)]="currency"/>
            <app-select-conversion-direction [(direction)]="direction" [currency]="currency"/>
<!--            <input-amount v-model="amount" :currency="currencyForInput"/>-->

          </form>
        </div>

        <div class="col-sm-12 col-md-6 m-auto bg-light">
<!--          <conversion-result :amount="amount" :currency="currency" :direction="direction"/>-->
        </div>
      </div>

      <div class="row">
        <div class="col">
          <p>
            Example {{title}} web application.
          </p>

          <p>Currency: {{currency}}</p>
          <p>Direction: {{direction}}</p>
        </div>
      </div>
    </div>
  `,
  styles: `
  `
})
export class AppComponent implements OnInit {
  title = 'Angular 17 Bitcoin Converter';

  // Set defaults.
  currency = CURRENCY.EUR;
  direction = CONVERT_DIR.FROM_BTC;
  amount = 1;

  /**
   * Determine if we have to show 'USD', 'EUR' or 'BTC'.
   */
  get currencyForInput(): string {
    return this.direction === CONVERT_DIR.FROM_BTC ? CURRENCY.BTC : this.currency;
  }

  constructor() {
  }

  ngOnInit(): void {
        //Todo
    }
}
