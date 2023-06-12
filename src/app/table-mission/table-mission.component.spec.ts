import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMissionComponent } from './table-mission.component';

describe('TableMissionComponent', () => {
  let component: TableMissionComponent;
  let fixture: ComponentFixture<TableMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableMissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
