import { TestBed } from '@angular/core/testing';

import { DemanderequestService } from './demanderequest.service';

describe('DemanderequestService', () => {
  let service: DemanderequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemanderequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
