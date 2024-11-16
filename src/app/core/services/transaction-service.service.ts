import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgentSummaryDto } from '../../shared/models/agent-summary-dto.model';
import { AgentRechargeHistoryDto } from '../../shared/models/agent-recharge-history-dto.model';
import { AgentBalanceDto } from '../../shared/models/agent-balance-dto.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionServiceService {
private baseApiUrl: string = environment.baseApiUrl+'Transaction/'
  constructor(private _http:HttpClient) { }

  GetRegistrationfees(){
    return this._http.get<number>(this.baseApiUrl+'GetRegistrationfees');
  }

  GetSupportUrl(){
    return this._http.get<string>(this.baseApiUrl+'GetSupportUrl');
  }

  // GetAgentBalance(agentId:number): Observable<any>{
  //   return this._http.get(this.baseApiUrl+'GetAgentBalance?id='+agentId);
  // }

  GetAgentBalance(): Observable<AgentBalanceDto>{
    return this._http.get<AgentBalanceDto>(this.baseApiUrl+'GetAgentBalance');
  }
  
  GetAgentSummary(): Observable<any> {
    return this._http.get<AgentSummaryDto>(this.baseApiUrl + 'GetAgentSummary');
  }

  GetAgentRechargeHistory(dateFrom: string, dateTo: string): Observable<any> {
    return this._http.get<AgentRechargeHistoryDto>(this.baseApiUrl + 'GetAgentRechargeHistory?dateFrom=' + dateFrom + '&dateTo=' + dateTo);
  }

}
