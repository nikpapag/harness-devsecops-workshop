import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SslErrorGuard } from './ssl-error.guard';
import { environment } from '../../environments/environment';

describe('SslErrorGuard', () => {
  let guard: SslErrorGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SslErrorGuard,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    });
    guard = TestBed.inject(SslErrorGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when showSslCertificateError is false', () => {
    spyOnProperty(environment, 'showSslCertificateError', 'get').and.returnValue(false);
    const result = guard.canActivate({} as any, {} as any);
    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to ssl-error when showSslCertificateError is true', () => {
    spyOnProperty(environment, 'showSslCertificateError', 'get').and.returnValue(true);
    const result = guard.canActivate({} as any, {} as any);
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/ssl-error']);
  });
});
