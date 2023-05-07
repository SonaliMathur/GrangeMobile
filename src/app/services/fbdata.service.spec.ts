import { TestBed } from '@angular/core/testing';

import { FbdataService } from './fbdata.service';

describe('FbdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FbdataService = TestBed.get(FbdataService);
    expect(service).toBeTruthy();
  });
});
