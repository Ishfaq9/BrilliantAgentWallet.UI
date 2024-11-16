import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from '../../services/authenticationService/authentication.service';
import { inject } from '@angular/core';
import { SessionHelper } from '../../../shared/helpers/session-helper';

export const tokenRefreshInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(AuthenticationService);
  var token = SessionHelper.GetToken();
  const headers = req.headers;
  var skipIntercept = headers.has('TokenRefreshInterceptor');

  if (token) {
    var skipIntercept = req.headers.has('X-Skip-Interceptor');
    if (req.headers.has('X-Skip-Interceptor')) {
      return next(req);
    }
    authenticationService.RefreshToken().subscribe({
      next: (res) => {
        authenticationService.StoreToken(res.ObjResponse);
      }
    });
  }
  return next(req);
};
