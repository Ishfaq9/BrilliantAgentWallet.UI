import { Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AgentBalanceComponent } from '../../components/agent-balance/agent-balance.component';
import { NgxSpinnerService } from "ngx-spinner";
import { UIHelperService } from '../../shared/helpers/u-i-helper.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { SessionHelper } from '../../shared/helpers/session-helper';
import { AgentBalanceDto } from '../../shared/models/agent-balance-dto.model';
@Component({
  selector: 'app-agent-recharge',
  standalone: true,
  imports: [MaterialModule, FormsModule, AgentBalanceComponent ,RouterModule],
  templateUrl: './agent-recharge.component.html',
  styleUrl: './agent-recharge.component.scss'
})
export class AgentRechargeComponent implements OnInit {

  rechargeAmount!: number;
  AgentBalanceDto!: AgentBalanceDto;
  constructor(private router: Router, private spinner: NgxSpinnerService,
    private uiHelperService: UIHelperService
  ) {
    this.AgentBalanceDto = new AgentBalanceDto();
  }
  ngOnInit() {
  }

  recharge() {
    if (this.rechargeAmount <= 0) {
      this.uiHelperService.SwalMessageWarning('Invalid Balance', 'Please Enter valid amount');
    }
    else if(this.rechargeAmount < this.AgentBalanceDto.MinimumAgentRechargePerTransection){
      this.uiHelperService.SwalMessageWarning('Invalid Balance', `Minimum Recharge Amount ${this.AgentBalanceDto.MinimumAgentRechargePerTransection}TK`);
    }
    else if(this.rechargeAmount > this.AgentBalanceDto.MaximumAgentRechargePerTransection){
      this.uiHelperService.SwalMessageWarning('Invalid Balance', `Maximum Recharge Amount ${this.AgentBalanceDto.MaximumAgentRechargePerTransection}TK`);
    }
    else if(this.rechargeAmount==null){
      this.uiHelperService.SwalMessageWarning('Empty Feild', 'Please Enter valid amount');
    } else {
      this.router.navigate(['/payment-method', this.rechargeAmount]);
    }


  }
  rechargeHistory() {
    this.router.navigate(['/agent-recharge-history']);
  }
  updateAgentBalance(agentBalanceDto: AgentBalanceDto) {
    this.AgentBalanceDto = agentBalanceDto;
    this.ngOnInit();
  }
}
