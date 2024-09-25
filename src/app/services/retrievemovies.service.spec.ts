import { TestBed } from '@angular/core/testing';

import { RetrievemoviesService } from './retrievemovies.service';

describe('RetrievemoviesService', () => {
  let service: RetrievemoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetrievemoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
