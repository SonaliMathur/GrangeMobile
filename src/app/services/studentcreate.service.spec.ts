import { TestBed } from '@angular/core/testing';

import { StudentCreateService } from './studentcreate.service';

describe('StudentcreateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentCreateService = TestBed.get(StudentCreateService);
    expect(service).toBeTruthy();
  });
});
