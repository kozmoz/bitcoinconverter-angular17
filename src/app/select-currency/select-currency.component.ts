import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CURRENCY} from "../../domain/enums";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-select-currency',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  template: `
    <div class="form-group row">
      <label class="col-sm-3 col-form-label" for="currencyField">Currency</label>
      <div class="col-sm-9">
        <select id="currencyField" class="form-control" [(ngModel)]="currency" (change)="currencyChanged()">
          <option *ngFor="let c of CURRENCIES" [value]="c">
            {{ currency_labels[c] }}
          </option>
        </select>
      </div>
    </div>
  `
})
export class SelectCurrencyComponent {

  // List of alle currencies available.
  CURRENCIES = [CURRENCY.EUR, CURRENCY.USD];

  currency_labels: { [currency: string]: string } = {
    EUR: 'Euro €',
    USD: 'Dollar $'
  }

  @Input()
  currency!: CURRENCY;

  @Output()
  currencyChange = new EventEmitter<CURRENCY>();

  currencyChanged() {
    this.currencyChange.emit(this.currency);
  }
}
