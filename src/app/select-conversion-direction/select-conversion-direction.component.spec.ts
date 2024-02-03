import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectConversionDirectionComponent } from './select-conversion-direction.component';

describe('SelectConversionDirectionComponent', () => {
  let component: SelectConversionDirectionComponent;
  let fixture: ComponentFixture<SelectConversionDirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectConversionDirectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectConversionDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
