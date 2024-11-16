import { PlatformLocation } from '@angular/common';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/authenticationService/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteHelperService{

  ReferrerPathname!: string;
  Paths: string[] = ['/agent-summary', '/agent-recharge', '/customer-recharge', '/terms-condition'
    ,'/back-from-registration','/back-from-payment-registration','/agent-registration', '/payment-method-reg'];
  constructor(private platformLocation: PlatformLocation, private router: Router){}//,private authenticationService: AuthenticationService) {}

  SetPopState(){
    this.platformLocation.onPopState(() => {
      this.CheckAndGoBack();
    });
  }

  // GoBackToFirstUrl(goLength : number = 0) {
  //   const backInterval = setInterval(() => {
  //   console.log(window.history.length);
  //     if (window.history.length <= goLength) {
  //       clearInterval(backInterval);
  //     } else {
  //       window.history.back();
  //     }
  //   }, 1);
  // }

  GoBackToFirstUrl(goLength = 0) {
    const backInterval = setInterval(() => {
      console.log(window.history.length);
      if (window.history.length <= goLength) {
        clearInterval(backInterval);
      } else {
        const currentUrl = window.location.href;
        window.history.back();
  
        // Check if the URL changes within 500ms (or any suitable duration)
        setTimeout(() => {
          if (window.location.href !== currentUrl) {
            console.log('Page navigated forward automatically, going back again.');
            window.history.back();
          }
        }, 0);
      }
    }, 0);
  }
  
  async CheckAndGoBack() {
    // Extract the pathname from the referrer URL
    this.ReferrerPathname = "/" + this.router.routerState.snapshot.url.split('/')[1];
    // Check if the pathname matches the specific route
    const containsString = this.Paths.indexOf(this.ReferrerPathname) > -1;
    if (containsString) {
      this.GoBackToFirstUrl();
    }
  }
  
}
