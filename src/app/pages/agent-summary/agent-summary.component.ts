import { Component } from '@angular/core';
import { AgentBalanceComponent } from "../../components/agent-balance/agent-balance.component";
import { AgentRechargeServiceService } from '../../core/services/agent-recharge-service.service';
import { AgentSummaryDto } from '../../shared/models/agent-summary-dto.model';
import { UIHelperService } from '../../shared/helpers/u-i-helper.service';
import { TransactionServiceService } from '../../core/services/transaction-service.service';
import { Router } from '@angular/router';
import { SessionHelper } from '../../shared/helpers/session-helper';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgentBalanceDto } from '../../shared/models/agent-balance-dto.model';

@Component({
    selector: 'app-agent-summary',
    standalone: true,
    templateUrl: './agent-summary.component.html',
    styleUrl: './agent-summary.component.scss',
    imports: [AgentBalanceComponent, CommonModule, RouterModule]
})
export class AgentSummaryComponent {
    agentSummaryDto: AgentSummaryDto = { FullName: "", PhoneNumber: '', IsActive: true, Balance: 0, InsertedDate: ''
        , CustomerRecharge: 0, AgentRecharge: 0, Commission: 0, BrilliantSuportUrl: '',ReferralCode :'' };
    Status!: string;
    AgentCheck!: string;
    AgentBalanceDto!: AgentBalanceDto;

    constructor(private _transactionServiceService: TransactionServiceService, private uiHelperService: UIHelperService, private router: Router)
    {
        this.AgentBalanceDto = new AgentBalanceDto();
    }


    ngOnInit() {
        this.GetAgentSummary();
        this.AgentCheck = SessionHelper.GetRole()!;
    };
    downloadImage(imageUrl: string): void {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
        link.click();
      }

    GetAgentSummary() {
        this.uiHelperService.SpinnerShow();
        this._transactionServiceService.GetAgentSummary().subscribe(result => {
            this.uiHelperService.SpinnerHide();
            if (result != null) {
                this.agentSummaryDto = result;
                if (this.agentSummaryDto.IsActive == true) {
                    this.Status = 'Active';
                } else {
                    this.Status = 'InActive';
                }
            } else {
                this.uiHelperService.SwalMessageError('Data Not Found', 'Agent is not found');
            }
        }, error => {
            this.uiHelperService.SpinnerHide();
            this.uiHelperService.SwalMessageServerError();
        });
    }

    // SubAgent() {
    //     this.router.navigate(['/sub-agent-list']);
    // }
    updateAgentBalance(agentBalanceDto: AgentBalanceDto) {
        this.AgentBalanceDto = agentBalanceDto;
        this.ngOnInit();
      }

    RedirectLink(url: string){
        window.location.href = url;
    }
}
