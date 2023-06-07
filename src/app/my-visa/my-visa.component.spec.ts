import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVisaComponent } from './my-visa.component';

describe('MyVisaComponent', () => {
  let component: MyVisaComponent;
  let fixture: ComponentFixture<MyVisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyVisaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
