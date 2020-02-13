import { TestBed } from '@angular/core/testing';

import { PropertyImageService } from './property-image.service';

describe('PropertyImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PropertyImageService = TestBed.get(PropertyImageService);
    expect(service).toBeTruthy();
  });
});
