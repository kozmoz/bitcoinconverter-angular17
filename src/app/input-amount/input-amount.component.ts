import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CURRENCY} from "../../domain/enums";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-input-amount',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  template: `
    <div class="form-group row">
      <label class="col-sm-3 col-form-label" for="amount">Amount</label>
      <div class="col-sm-9">
        <div class="input-group w-75">
          <div class="input-group-prepend">
            <span class="input-group-text">{{ getCurrencyLabel() }}</span>
          </div>

          <!--suppress JSUnresolvedVariable -->
          <input
            id="amount"
            type="text"
            ngModel="modelValue"
            maxlength="10"
            class="form-control"
            [class]="{ 'is-invalid': isInvalid()}"
            (input)="updateAmount()"
            [(ngModel)]="modelValue"
          />

          <div *ngIf="isInvalid()" class="invalid-feedback">
            Only positive numbers are allowed
          </div>
        </div>
        <small class="form-text text-muted">The amount should be an integer</small>
      </div>
    </div>
  `
})
export class InputAmountComponent implements OnInit {

  @Input()
  currency!: CURRENCY;

  @Input()
  amount!: number;

  @Output()
  amountChange = new EventEmitter<number>();

  modelValue: string = '';

  ngOnInit(): void {
    this.modelValue = `${this.amount}`;
  }

  getCurrencyLabel() {
    return this.currency == 'EUR' ? '€' : '$';
  }

  isInvalid() {
    return !!(this.modelValue && !this.isNumeric(this.modelValue));
  }

  /**
   * Tests if the given value is numeric.
   * @param value The string value to test
   * @returns The number or 0 if not recognized as number
   */
  isNumeric(value: string): number {
    return /^[0-9]+$/.test(value) ? parseInt(value, 10) : 0;
  }


  updateAmount() {
    this.amountChange.emit(this.isNumeric(this.modelValue));
  }
}
