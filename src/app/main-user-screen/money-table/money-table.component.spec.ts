import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyTableComponent } from './money-table.component';

describe('MoneyTableComponent', () => {
  let component: MoneyTableComponent;
  let fixture: ComponentFixture<MoneyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
