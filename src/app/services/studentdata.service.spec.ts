import { TestBed } from '@angular/core/testing';

import { StudentDataService } from './studentdata.service';

describe('StudentdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentDataService = TestBed.get(StudentDataService);
    expect(service).toBeTruthy();
  });
});
