import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDirecteurComponent } from './header-directeur.component';

describe('HeaderDirecteurComponent', () => {
  let component: HeaderDirecteurComponent;
  let fixture: ComponentFixture<HeaderDirecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDirecteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
