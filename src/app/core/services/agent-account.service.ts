import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubAgentSummaryDto } from '../../shared/models/sub-agent-summary-dto.model';

@Injectable({
  providedIn: 'root'
})
export class AgentAccountService {
  private baseApiUrl=environment.baseApiUrl;
  constructor(private _http:HttpClient) { }

  GetSubAgents(): Observable<Array<SubAgentSummaryDto>> {
    return this._http.get<Array<SubAgentSummaryDto>>(this.baseApiUrl + 'AgentAccount/GetSubAgents');
  }
}
