import { Component } from '@angular/core';
import { AgentRechargeServiceService } from '../../core/services/agent-recharge-service.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { error } from 'console';
import { AgentRechargeHistoryDto } from '../../shared/models/agent-recharge-history-dto.model';
import { UIHelperService } from '../../shared/helpers/u-i-helper.service';
import { TransactionServiceService } from '../../core/services/transaction-service.service';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-agent-recharge-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agent-recharge-history.component.html',
  styleUrl: './agent-recharge-history.component.scss'
})
export class AgentRechargeHistoryComponent {
  dateFrom!: string | null;
  dateTo!: string | null;
  minDate!: string | null;
  agentRechargeHistoryDto: AgentRechargeHistoryDto[] = [];
  TotalAmount: number = 0;
  constructor(private _transactionServiceService: TransactionServiceService, private uiHelperService: UIHelperService, public datePipe: DatePipe) { }

  ngOnInit(){
    this.dateFrom = this.datePipe.transform(new Date, 'yyyy-MM-dd');
    this.dateTo = this.dateFrom;
    this.GetAgentRechargeHistory();
  }


  updateMinDate() {
    this.minDate = this.dateFrom;
  }

  GetAgentRechargeHistory() {
    if (this.dateFrom == null || this.dateTo == null) {
      this.uiHelperService.SwalMessageWarning('Warning', 'Please Select The date');
    } else {
      this.TotalAmount =0;
      this.uiHelperService.SpinnerShow();
      this._transactionServiceService.GetAgentRechargeHistory(this.dateFrom, this.dateTo).subscribe(result => {
        this.uiHelperService.SpinnerHide();
        if (result != null && result.length > 0) {
          this.agentRechargeHistoryDto = result;
          this.TotalAmount = this.agentRechargeHistoryDto.reduce((sum, current) => sum + current.Amount, 0);
          //console.log(this.agentRechargeHistoryDto);
        } else {
          //alert("Agent recharge history not found");
          this.agentRechargeHistoryDto = [];
          this.uiHelperService.SwalMessageWarning('No Data Found', 'No recharge found for the selected dates.');
        }
      }, error => {
        this.uiHelperService.SwalMessageServerError();
        this.uiHelperService.SpinnerHide();
        console.error("Error occurred while fetching agent recharge history:" + error);
      }
      );
    }
  }

}
