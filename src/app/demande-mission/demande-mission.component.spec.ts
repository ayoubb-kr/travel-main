import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeMissionComponent } from './demande-mission.component';

describe('DemandeMissionComponent', () => {
  let component: DemandeMissionComponent;
  let fixture: ComponentFixture<DemandeMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeMissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
