import { TestBed } from '@angular/core/testing';

import { ServicePropertyService } from './service-property.service';

describe('ServicePropertyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePropertyService = TestBed.get(ServicePropertyService);
    expect(service).toBeTruthy();
  });
});
