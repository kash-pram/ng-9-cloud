import { TestBed } from '@angular/core/testing';

import { NgWordCloudService } from './ng-word-cloud.service';

describe('NgWordCloudService', () => {
  let service: NgWordCloudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgWordCloudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
