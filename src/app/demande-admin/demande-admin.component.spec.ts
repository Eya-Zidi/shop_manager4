import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeAdminComponent } from './demande-admin.component';

describe('DemandeAdminComponent', () => {
  let component: DemandeAdminComponent;
  let fixture: ComponentFixture<DemandeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
