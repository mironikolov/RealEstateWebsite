import { TestBed } from '@angular/core/testing';

import { GoogleMapsServiceService } from './google-maps-service.service';

describe('GoogleMapsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleMapsServiceService = TestBed.get(GoogleMapsServiceService);
    expect(service).toBeTruthy();
  });
});
