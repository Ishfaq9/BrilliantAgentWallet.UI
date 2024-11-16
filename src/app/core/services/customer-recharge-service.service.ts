import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../shared/models/responses/response.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerRechargeServiceService {
  private baseApiUrl: string = environment.baseApiUrl + 'CustomerRecharge'
  constructor(private _http: HttpClient) { }

  /*  CustomerRecharge(): Observable<any>{
     return this._http.post(this.baseApiUrl);
   } */
  /*   CustomerRecharge(topupAmount: number, topupNumber: number): Observable<any>{
      const body = { amount: topupAmount, number: topupNumber };
      return this._http.post(this.baseApiUrl, body);
    } */
  CustomerRecharge(topupAmount: number, topupNumber: string): Observable<any> {
    //const body = { amount: topupAmount, number: topupNumber };
    return this._http.post(this.baseApiUrl + '/Post?receiverNumber=' + topupNumber + '&amount=' + topupAmount, null);
  }

  CustomerRechargeWithRC(topupAmount: number, topupNumber: string, referralCode: string): Observable<any> {
    return this._http.post<Response>(this.baseApiUrl+'/PostWithRC?receiverNumber=' + topupNumber + '&amount='+ topupAmount + '&referralCode='+referralCode,null);
  }

}
