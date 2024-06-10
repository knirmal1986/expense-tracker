import { TestBed } from '@angular/core/testing';

import { LoginJsonService } from './login-json.service';

describe('LoginService', () => {
  let service: LoginJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
