import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPassportComponent } from './my-passport.component';

describe('MyPassportComponent', () => {
  let component: MyPassportComponent;
  let fixture: ComponentFixture<MyPassportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPassportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
