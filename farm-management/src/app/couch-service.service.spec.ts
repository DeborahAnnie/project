import { TestBed } from '@angular/core/testing';

import { CouchServiceService } from './couch-service.service';

describe('CouchServiceService', () => {
  let service: CouchServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouchServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
