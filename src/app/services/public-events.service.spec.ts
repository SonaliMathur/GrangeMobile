import { TestBed } from '@angular/core/testing';

import { PublicEventsService } from './public-events.service';

describe('PublicEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublicEventsService = TestBed.get(PublicEventsService);
    expect(service).toBeTruthy();
  });
});
