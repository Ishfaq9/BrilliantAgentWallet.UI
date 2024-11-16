import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionServiceService } from '../../core/services/transaction-service.service';
import { SessionHelper } from '../../shared/helpers/session-helper';
import { UIHelperService } from '../../shared/helpers/u-i-helper.service';
import { AgentBalanceDto } from '../../shared/models/agent-balance-dto.model';

@Component({
  selector: 'app-agent-balance',
  standalone: true,
  imports: [],
  templateUrl: './agent-balance.component.html',
  styleUrl: './agent-balance.component.scss'
})
export class AgentBalanceComponent {
  @Output() agentBalanceChanged = new EventEmitter<AgentBalanceDto>();

  parentModel = { name: 'John Doe', age: 30 };
  //agentBalance: number=0;
  BrilliantNumber: string='xxxxxxxxxxx';
  AgentName: any='Brilliant Number';
  AgentBalanceDto!: AgentBalanceDto;

  constructor(private _router: Router,private _transactionServiceService:TransactionServiceService,private _uIHelperService: UIHelperService) {
    this.AgentBalanceDto = new AgentBalanceDto();
  }
  ngOnInit() {
    this.GetAgentBalance();
    this.AgentName = SessionHelper.GetUserFullName();
    this.BrilliantNumber=SessionHelper.GetUserPhoneNumber()!;
  };

  GetAgentBalance() {
    this._uIHelperService.SpinnerShow();
    this._transactionServiceService.GetAgentBalance().subscribe({
      next:(res: AgentBalanceDto) => {
        this._uIHelperService.SpinnerHide();
        this.AgentBalanceDto=res;
        this.agentBalanceChanged.emit(this.AgentBalanceDto);
      },
      error:(err: any) => {
        this._uIHelperService.SpinnerHide();
      }
    })
  }

}
