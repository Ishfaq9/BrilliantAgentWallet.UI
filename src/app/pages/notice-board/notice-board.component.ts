import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgentNoticeBoard } from '../../shared/models/agent-notice-board.model';
import { AgentNoticeBoardServiceService } from '../../core/services/agent-notice-board-service.service';
import { UIHelperService } from '../../shared/helpers/u-i-helper.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notice-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notice-board.component.html',
  styleUrl: './notice-board.component.scss'
})
export class NoticeBoardComponent {

  agentNoticeBoard: AgentNoticeBoard[] = [];

  constructor(private agentNoticeBoardServiceService: AgentNoticeBoardServiceService, private uIHelperService: UIHelperService,private router:Router) { }

  ngOnInit() {
    this.generateMockData();
    //this.GetAllNotice();
  }

    // Generate 20 rows of mock data
    generateMockData() {
      this.uIHelperService.SpinnerShow();
      for (let i = 1; i <= 20; i++) {
        const notice = new AgentNoticeBoard();
        notice.Id = i;
        notice.Title = `Notice Title ${i}`;
        notice.Message = `This is the message for notice number ${i}. It can contain any content for testing purposes. It can contain any content for testing purposes.`;
        notice.MessageType = i % 2 === 0 ? 'Info' : 'Warning';
        notice.InsertedDate = `2024-11-${i < 10 ? '0' + i : i}`;
        notice.InsertedDateTime = `2024-11-${i < 10 ? '0' + i : i}T12:00:00`;
        notice.InsertedBy = `Admin ${i}`;
        notice.UpdatedDateTime = i % 2 === 0 ? `2024-11-${i < 10 ? '0' + i : i}T14:00:00` : null;
        notice.UpdatedBy = i % 2 === 0 ? `Admin ${i + 1}` : null;
        notice.IsActive = i % 2 === 0; // Alternating active states for demonstration purposes
        
        this.agentNoticeBoard.push(notice);

      }
      this.uIHelperService.SpinnerHide();
    }


  // GetAllNotice() {
  //   this.uIHelperService.SpinnerShow();
  //   this.agentNoticeBoardServiceService.GetAllNotice().subscribe(result => {
  //     this.uIHelperService.SpinnerHide();
  //     if (result == null) {
  //       this.uIHelperService.SwalMessageError('Error', 'No Data Found');
  //     } else {
  //       this.agentNoticeBoard = result;
  //     }
  //   }, error => {
  //     this.uIHelperService.SpinnerHide();
  //     this.uIHelperService.SwalMessageServerError();
  //   });
  // }

  selectCard(card: AgentNoticeBoard) {
    const cardString = JSON.stringify(card);
    this.router.navigate(['notice-board-details'], { queryParams: { card: cardString } });
  }

}
