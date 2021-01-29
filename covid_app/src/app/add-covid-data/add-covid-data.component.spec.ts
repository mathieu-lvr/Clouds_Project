import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCovidDataComponent } from './add-covid-data.component';

describe('AddCovidDataComponent', () => {
  let component: AddCovidDataComponent;
  let fixture: ComponentFixture<AddCovidDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCovidDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCovidDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
