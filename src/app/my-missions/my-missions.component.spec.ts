import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMissionsComponent } from './my-missions.component';

describe('MyMissionsComponent', () => {
  let component: MyMissionsComponent;
  let fixture: ComponentFixture<MyMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyMissionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
