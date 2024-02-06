import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CONVERT_DIR, CURRENCY} from "../domain/enums";
import {SelectCurrencyComponent} from "./select-currency/select-currency.component";
import {SelectConversionDirectionComponent} from "./select-conversion-direction/select-conversion-direction.component";
import {InputAmountComponent} from "./input-amount/input-amount.component";
import {ConversionResultComponent} from "./conversion-result/conversion-result.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SelectCurrencyComponent, SelectConversionDirectionComponent, InputAmountComponent, ConversionResultComponent],
  template: `

    <div class="container">
      <div class="row">
        <div class="col converter-block-title text-center text-white">
          <div class="float-right pt-2">
            <!-- <app-select-language/> -->
          </div>
          <h2>{{ title }}</h2>
        </div>
      </div>

      <div class="row py-3 bg-light">
        <div class="col-sm-12 col-md-6">
          <form novalidate autocomplete="off">

            <app-select-currency [(currency)]="currency"/>
            <app-select-conversion-direction [(direction)]="direction" [currency]="currency"/>
            <app-input-amount [(amount)]="amount" [currency]="currency"/>

          </form>
        </div>

        <div class="col-sm-12 col-md-6 m-auto bg-light">
          <app-conversion-result [amount]="amount" [currency]="currency" [direction]="direction"/>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <p>
            Example {{ title }} web application.
          </p>

        </div>
      </div>
    </div>
  `,
  styles: `
    .converter-block-title {
      background: linear-gradient(to bottom, #184791 0%, #00256f 100%);
    }
  `
})
export class AppComponent {
  title = 'Angular 17 Bitcoin Converter';

  // Set defaults.
  currency = CURRENCY.EUR;
  direction = CONVERT_DIR.FROM_BTC;
  amount = 1;
}
