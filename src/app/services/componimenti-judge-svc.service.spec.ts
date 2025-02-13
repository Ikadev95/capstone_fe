import { TestBed } from '@angular/core/testing';

import { ComponimentiJudgeSvcService } from './componimenti-judge-svc.service';

describe('ComponimentiJudgeSvcService', () => {
  let service: ComponimentiJudgeSvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponimentiJudgeSvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
