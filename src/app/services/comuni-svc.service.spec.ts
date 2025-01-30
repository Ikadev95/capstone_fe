import { TestBed } from '@angular/core/testing';

import { ComuniSvcService } from './comuni-svc.service';

describe('ComuniSvcService', () => {
  let service: ComuniSvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComuniSvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
