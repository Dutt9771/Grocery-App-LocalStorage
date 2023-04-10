import { TestBed } from '@angular/core/testing';

import { AuthCheckoutGuard } from './auth-checkout.guard';

describe('AuthCheckoutGuard', () => {
  let guard: AuthCheckoutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthCheckoutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
