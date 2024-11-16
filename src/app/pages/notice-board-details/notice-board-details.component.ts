import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgentNoticeBoard } from '../../shared/models/agent-notice-board.model';

@Component({
  selector: 'app-notice-board-details',
  standalone: true,
  imports: [],
  templateUrl: './notice-board-details.component.html',
  styleUrl: './notice-board-details.component.scss'
})
export class NoticeBoardDetailsComponent {

  agentNotice!:AgentNoticeBoard;
  constructor(private route : ActivatedRoute){}

  ngOnInit(){
      this.route.queryParams.subscribe(params => {
    const cardString = params['card'];
    if (cardString) {
      this.agentNotice = JSON.parse(cardString);
      console.log(this.agentNotice)
    }
  });
  }

}
