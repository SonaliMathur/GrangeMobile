import { TestBed } from '@angular/core/testing';

import { LecturerDataService } from './lecturerdata.service';

describe('LecturerdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LecturerDataService = TestBed.get(LecturerDataService);
    expect(service).toBeTruthy();
  });
});
