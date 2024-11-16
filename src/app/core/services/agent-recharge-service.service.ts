import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgentRechargeHistoryDto } from '../../shared/models/agent-recharge-history-dto.model';
import { AgentSummaryDto } from '../../shared/models/agent-summary-dto.model';

@Injectable({
  providedIn: 'root'
})
export class AgentRechargeServiceService {
  private baseApiUrl: string = environment.baseApiUrl
  constructor(private _http: HttpClient) { }

  CreateBkashPayment(amount: number): Observable<any> {
    return this._http.post(this.baseApiUrl + 'Bkash/BkashCreateRecharge?amount=' + amount, null);
  }

  CreateNagadPayment(amount: number): Observable<any> {
    return this._http.post(this.baseApiUrl + 'Nagad/NagadCreateRecharge?amount=' + amount, null);
  }
  CreateShurjoPayPayment(amount: number): Observable<any> {
    return this._http.post(this.baseApiUrl + 'Shurjopay/ShurjoPayCreateRecharge?amount=' + amount, null);
  }

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
