import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPassportComponent } from './list-passport.component';

describe('ListPassportComponent', () => {
  let component: ListPassportComponent;
  let fixture: ComponentFixture<ListPassportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPassportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
