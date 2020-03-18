import { TestBed } from '@angular/core/testing';

import { CaseConverterService } from './case-converter.service';

describe('CaseConverterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaseConverterService = TestBed.get(CaseConverterService);
    expect(service).toBeTruthy();
  });
});
