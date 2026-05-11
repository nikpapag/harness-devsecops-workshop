import { TestBed } from '@angular/core/testing';

import { HarnessFfService } from './harness-ff.service';

describe('HarnessFfService', () => {
  let service: HarnessFfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HarnessFfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
