import { TestBed, inject } from '@angular/core/testing';

import { PropfilterService } from './propfilter.service';

describe('PropfilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropfilterService]
    });
  });

  it('should be created', inject([PropfilterService], (service: PropfilterService) => {
    expect(service).toBeTruthy();
  }));
});
