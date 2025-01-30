import { TestBed } from '@angular/core/testing';

import { ComunesvcService } from './comunesvc.service';

describe('ComunesvcService', () => {
  let service: ComunesvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunesvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
