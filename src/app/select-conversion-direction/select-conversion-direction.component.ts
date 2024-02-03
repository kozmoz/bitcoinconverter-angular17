import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CONVERT_DIR, CURRENCY} from "../../domain/enums";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-select-conversion-direction',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  template: `
    <div class="form-group row">
      <legend class="col-form-label col-sm-3 pt-0">
        Direction
      </legend>
      <div class="col-sm-9">
        <div *ngFor="let d of directions; let i = index" class="form-check">
          <!--suppress HtmlFormInputWithoutLabel -->
          <input
            type="radio"
            name="direction"
            [(ngModel)]="direction"
            [value]="d"
            [id]="'direction-' + d"
            class="form-check-input"
            (change)="directionChanged()"
          />
          <label [for]="'direction-' + d" class="form-check-label">
            {{ getDirectionLabel(d) }}
          </label>
        </div>
      </div>
    </div>`
})
export class SelectConversionDirectionComponent {

  directions: string[] = Object.keys(CONVERT_DIR);

  @Input()
  direction!: CONVERT_DIR;

  @Input()
  currency!: CURRENCY;

  @Output()
  directionChange = new EventEmitter<CONVERT_DIR>();

  directionChanged() {
    console.log('==== directionChanged: ', this.direction);
    this.directionChange.emit(this.direction);
  }

  getDirectionLabel(d: string) {
    let currencyLabel = this.currency == 'EUR' ? 'Euro €' : 'Dollar $';
    return d == 'FROM_BTC' ? `From BTC to ${currencyLabel}` : `From ${currencyLabel} to BTC`;
  }

}
