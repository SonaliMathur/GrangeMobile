import { TestBed } from '@angular/core/testing';

import { StudentDeleteService } from './studentdelete.service';

describe('StudentDeleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentDeleteService = TestBed.get(StudentDeleteService);
    expect(service).toBeTruthy();
  });
});
