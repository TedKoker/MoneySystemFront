import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainUserScreenComponent } from './main-user-screen.component';

describe('MainUserScreenComponent', () => {
  let component: MainUserScreenComponent;
  let fixture: ComponentFixture<MainUserScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainUserScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainUserScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
