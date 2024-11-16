import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NoticeBoardComponent } from '../../pages/notice-board/notice-board.component';
import { AgentNoticeBoard } from '../../shared/models/agent-notice-board.model';

@Injectable({
  providedIn: 'root'
})
export class AgentNoticeBoardServiceService {

  private baseApiUrl = environment.baseApiUrl + 'AgentAccount/';
  constructor(private httpClient: HttpClient) { }

  GetAllNotice(): Observable<any> {
    return this.httpClient.get<AgentNoticeBoard>(this.baseApiUrl+'GetAllNotice');
  }
}
