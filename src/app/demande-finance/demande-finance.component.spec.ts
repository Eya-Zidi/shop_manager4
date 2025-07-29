import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeFinanceComponent } from './demande-finance.component';

describe('DemandeFinanceComponent', () => {
  let component: DemandeFinanceComponent;
  let fixture: ComponentFixture<DemandeFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeFinanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
