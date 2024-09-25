import { TestBed } from '@angular/core/testing';

import { authorizationGuard } from './authorization-guard.service';

describe('AuthGuardService', () => {
  let service: typeof authorizationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(authorizationGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
