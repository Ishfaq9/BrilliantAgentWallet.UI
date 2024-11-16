import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authenticationService/authentication.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  
  if (authenticationService.IsLoggedIn()) {
    if(authenticationService.IsTokenExpired()){
      authenticationService.AuthenticationtTimedOut(state);
      return false;
    }else{
      return true;
    }
  } else {
    authenticationService.Logout();
    return false
  }
};
