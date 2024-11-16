import { HttpInterceptorFn } from '@angular/common/http';
import { SessionHelper } from '../../../shared/helpers/session-helper';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if(SessionHelper.IsLocalStorageAvailable()){
    const token = SessionHelper.GetToken();
    if(token){
      const authReq = req.clone({
        setHeaders: {Authorization: 'bearer '+token},
        withCredentials: true
      });
      return next(authReq);
    }
  }

  return next(req);
};
