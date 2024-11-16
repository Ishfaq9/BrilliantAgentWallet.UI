import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionHelper } from '../../../shared/helpers/session-helper';
import { CookieHelper } from '../../../shared/helpers/cookie-helper';
import { JwtHelper } from '../../../shared/helpers/jwt-helper';
import { JwtToken } from '../../../shared/models/authentication/jwt-token.model';
import { Response } from '../../../shared/models/responses/response.model';
import { RegisterDto } from '../../../shared/models/register-dto.model';
import { AgentRegDetail } from '../../../shared/models/agent-reg-detail.model';
import { RouteHelperService } from '../../../shared/helpers/route-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseApiUrl: string = environment.baseApiUrl+'Authentication/';
  constructor(private _http: HttpClient, private _router: Router, private _route: ActivatedRoute, private routeHelperService: RouteHelperService) { }

AgentRegistration(agentRegDetail:AgentRegDetail):Observable<Response>{
  return this._http.post<Response>(this.baseApiUrl+'NewAgentRegistration',agentRegDetail);
}
SubAgentRegistration(agentRegDetail:AgentRegDetail):Observable<Response>{
  return this._http.post<Response>(this.baseApiUrl+'SubAgentRegistration',agentRegDetail);
}


  BrilliantLogin(token : string, phoneNumber: string): Observable<Response>{
    SessionHelper.SetToken(token);
    const skipInterceptorHeaders = new HttpHeaders({ 'X-Skip-Interceptor': 'true' });
    return this._http.get<Response>(this.baseApiUrl + 'BrilliantLogin?phoneNumber='+phoneNumber,  { headers: skipInterceptorHeaders });
  }

  ExistingUserCheck(phoneNumber: string): Observable<Response>{
    return this._http.get<Response>(this.baseApiUrl + 'ExistingUserCheck?phoneNumber='+phoneNumber);
  }
  
  TermsConditionAccept(acceptance: boolean, phoneNumber: string): Observable<Response>{
    return this._http.post<Response>(this.baseApiUrl + 'TermsConditionAccept?acceptance='+acceptance+'&phoneNumber='+phoneNumber, null);
  }

  DipositeCheck(acceptance: boolean, phoneNumber: string): Observable<Response>{
    return this._http.post<Response>(this.baseApiUrl + 'DipositeCheck?phoneNumber='+phoneNumber, null);
  }

  RefreshToken(): Observable<Response>{
    const skipInterceptorHeaders = new HttpHeaders({ 'X-Skip-Interceptor': 'true' });
    return this._http.get<Response>(this.baseApiUrl + 'refresh-token',  { headers: skipInterceptorHeaders });
  }

  Logout(){
    SessionHelper.ClearLocalStorage();
    CookieHelper.ClearAllCookies();
    if(environment.isBrilliantApp){
      this.routeHelperService.GoBackToFirstUrl(0);
    }
    return this._router.navigate(['brilliant-login']);
  }

  LogoutWithoutRedirect(){
    SessionHelper.ClearLocalStorage();
    CookieHelper.ClearAllCookies();
  }

  AuthenticationtTimedOut(state: RouterStateSnapshot){
    SessionHelper.ClearLocalStorage();
    CookieHelper.ClearAllCookies();
    // this._uIHelperService.SwalMessageError('Unauthorized', 'Session Time Out!');
    return this._router.navigate(['brilliant-login'],{queryParams:{'redirectURL':state.url}});
  }

  SignIncallBack(params: Params){
    var redirectURL!: string;
    if (params['redirectURL']) {
        redirectURL = params['redirectURL'];
    }

    if (redirectURL) {        
      this._router.navigateByUrl(redirectURL,)
          .catch(() => this._router.navigate(['']))
    } else {
      this._router.navigate(['/']);
    }
    this._router.navigate(['']);
  }

  async StoreToken(jwtToken: JwtToken){
    SessionHelper.SetToken(jwtToken.Token);
    SessionHelper.SetRefreshToken(jwtToken.RefreshToken);
    SessionHelper.SetTokenExpiresTimeNet(jwtToken.TokenExpiration.toString());
    SessionHelper.SetTokenExpiresTimeNet(jwtToken.RefreshTokenExpiration.toString());
    CookieHelper.SetRefreshToken(jwtToken.RefreshToken, jwtToken.RefreshTokenExpiration);

    var jwtHelper : JwtHelper = new JwtHelper();
    jwtHelper.DecodeToken(jwtToken.Token);
    SessionHelper.SetUserId(jwtHelper.GetClaims('nameidentifier'));
    SessionHelper.SetUserName(jwtHelper.GetClaims('name'));
    SessionHelper.SetUserPhoneNumber(jwtHelper.GetClaims('MobilePhone'));
    SessionHelper.SetAgentId(jwtHelper.GetClaims('Country'));
    SessionHelper.SetRole(jwtHelper.GetClaims('Role'));
    SessionHelper.SetUserFullName(jwtHelper.GetClaims('givenname'));
    //document.cookie='ishfaq';
    SessionHelper.SetTokenExpiresTime(new Date(jwtHelper.GetClaims('exp') * 1000).toString());

  }

  IsLoggedIn(): boolean{
    return SessionHelper.GetToken()!=null;
  }

  IsTokenExpired(): boolean {
    if (SessionHelper.GetTokenExpiresTime()) {
      return (new Date(SessionHelper.GetTokenExpiresTime()!) < new Date());
    } else {
      return false;
    }
  }
}
