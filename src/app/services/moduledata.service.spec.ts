import { TestBed } from '@angular/core/testing';

import { ModuleDataService } from './moduledata.service';

describe('ModuledataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModuleDataService = TestBed.get(ModuleDataService);
    expect(service).toBeTruthy();
  });
});
