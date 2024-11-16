import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerRechargeHistoryDto } from '../../shared/models/customer-recharge-history-dto.model';

@Injectable({
  providedIn: 'root'
})
export class TopUpHistoryServiceService {

  private baseUrl = environment.baseApiUrl + 'CustomerRecharge?';
  constructor(private http: HttpClient) { }

  GetTopUpHistory(dateFrom: string, dateTo: string, customerPhoneNumber: string): Observable<any> {
    return this.http.get<CustomerRechargeHistoryDto>(this.baseUrl + 'dateFrom=' + dateFrom + '&dateTo=' + dateTo + '&customerPhoneNumber=' + customerPhoneNumber);
  }
}
