import { Component, OnInit } from '@angular/core';
import { AgentAccountService } from '../../core/services/agent-account.service';
import { SubAgentSummaryDto } from '../../shared/models/sub-agent-summary-dto.model';
import { UIHelperService } from '../../shared/helpers/u-i-helper.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sub-agent-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sub-agent-list.component.html',
  styleUrl: './sub-agent-list.component.scss'
})
export class SubAgentListComponent implements OnInit {
    SubAgentsSummaryDto!: Array<SubAgentSummaryDto>;
    constructor(private _agentAccountService: AgentAccountService, private _uIHelperService: UIHelperService, private datePipe: DatePipe){}

    ngOnInit(): void {
      this.GetSubAgents();
    }
  
    GetSubAgents(){
      this._uIHelperService.SpinnerShow();
      this._agentAccountService.GetSubAgents().subscribe({
        next: (res) => {
          this._uIHelperService.SpinnerHide();
          this.SubAgentsSummaryDto = res;
          console.log(this.SubAgentsSummaryDto);
        },
        error: (err) => {
            this._uIHelperService.SpinnerHide();
            console.log(err.message);
            this._uIHelperService.SwalMessageError("Failed", "Failed to load data!");
        }
      });
    }

    ShowDetails(subAgentSummaryDto: SubAgentSummaryDto){
      var title = subAgentSummaryDto.FullName;
      var html = `<table  class="table table-bordered" style="font-size:12px; color: #1a3a54; font-weight: 500;">
      <tr>
        <td>Account Status:</td>
        <td>${subAgentSummaryDto.IsActive == true ? "Active" : "InActive"}</td>
      </tr>
      <tr>
        <td>Activation Date:</td>
        <td>${subAgentSummaryDto.ActivationDateTime}</td>
      </tr>
      <tr>
        <td>Balance:</td>
        <td>TK${subAgentSummaryDto.Balance}</td>
      </tr>
      <tr>
        <td>Total Top-Up Amount:</td>
        <td>TK${subAgentSummaryDto.TotalTopUp}</td>
      </tr>
      <tr>
        <td>Total Bonus Earned:</td>
        <td>TK${subAgentSummaryDto.TotalCommission}</td>
      </tr>
    </table>`;
      this._uIHelperService.SwalShowMessage(title,html);
    }
}
