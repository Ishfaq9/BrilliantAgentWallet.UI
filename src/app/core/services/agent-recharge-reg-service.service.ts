import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentRechargeRegServiceService {

  private baseApiUrl=environment.baseApiUrl;
  constructor(private _http:HttpClient) { }

  CreateBkashPaymentReg(amount: number, phonenumber: string): Observable<any> {
    return this._http.post(this.baseApiUrl + 'Bkash/BkashCreateRegistration?amount=' + amount + '&phonenumber=' + phonenumber, null);
  }

  CreateNagadPaymentReg(amount: number,phonenumber: string): Observable<any> {
    return this._http.post(this.baseApiUrl + 'Nagad/NagadCreateRegistration?amount=' + amount+'&phonenumber=' + phonenumber, null);
  }
  CreateShurjoPayPaymentReg(amount: number,phonenumber: string): Observable<any> {
    return this._http.post(this.baseApiUrl + 'Shurjopay/ShurjoPayCreateRegistration?amount=' + amount+'&phonenumber=' + phonenumber, null);
  }
}
