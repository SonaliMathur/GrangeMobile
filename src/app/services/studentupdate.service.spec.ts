import { TestBed } from '@angular/core/testing';

import { StudentUpdateService } from './studentupdate.service';

describe('StudentupdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentUpdateService = TestBed.get(StudentUpdateService);
    expect(service).toBeTruthy();
  });
});
