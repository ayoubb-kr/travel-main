import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeVisaComponent } from './demande-visa.component';

describe('DemandeVisaComponent', () => {
  let component: DemandeVisaComponent;
  let fixture: ComponentFixture<DemandeVisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeVisaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
