import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVisaComponent } from './list-visa.component';

describe('ListVisaComponent', () => {
  let component: ListVisaComponent;
  let fixture: ComponentFixture<ListVisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVisaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
