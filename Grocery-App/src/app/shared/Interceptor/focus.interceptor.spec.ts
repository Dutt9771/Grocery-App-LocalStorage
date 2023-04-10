import { TestBed } from '@angular/core/testing';

import { FocusInterceptor } from './focus.interceptor';

describe('FocusInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FocusInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FocusInterceptor = TestBed.inject(FocusInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
