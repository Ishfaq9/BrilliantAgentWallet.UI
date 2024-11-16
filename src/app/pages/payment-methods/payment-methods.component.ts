import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AgentBalanceComponent } from "../../components/agent-balance/agent-balance.component";
import { AgentRechargeServiceService } from '../../core/services/agent-recharge-service.service';
import { response } from 'express';
import { Response } from '../../shared/models/responses/response.model';
import { UIHelperService } from '../../shared/helpers/u-i-helper.service';
import Swal from 'sweetalert2';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouteHelperService } from '../../shared/helpers/route-helper.service';
import { SessionHelper } from '../../shared/helpers/session-helper';
import { AgentBalanceDto } from '../../shared/models/agent-balance-dto.model';

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  templateUrl: './payment-methods.component.html',
  styleUrl: './payment-methods.component.scss',
  imports: [AgentBalanceComponent, FooterComponent]
})
export class PaymentMethodsComponent implements OnInit {
  receivedAmount!: number;
  agentBalance!: number;
  amount!: number;
  //router: any;
  constructor(private _router: Router, private _route: ActivatedRoute,
    private _agentRechargeServiceService: AgentRechargeServiceService,
    private uiHelperService: UIHelperService) {
  }

  ngOnInit(): void {
    this.GetAmount();
    this.amount = this.agentBalance;
    //console.log(this.amount);
  }

  GetAmount() {
    this._route.paramMap.subscribe({
      next: (params) => {
        let amount = params.get('amount');
        this.receivedAmount = Number(amount);
      }
    });
  }
  updateAgentBalance(agentBalanceDto: AgentBalanceDto) {
    this.agentBalance = agentBalanceDto.AgentBalance;
    //console.log("The value of total amount is:" + (this.agentBalance + this.receivedAmount));
    this.ngOnInit();
  }

  CreateNagadPayment() {
    this.uiHelperService.SpinnerShow();
    this._agentRechargeServiceService.CreateNagadPayment(this.receivedAmount).subscribe({
      next: (val: Response) => {
        this.uiHelperService.SpinnerHide();
        if (val.IsSuccess) {
          window.location.href = val.Message;
        } else {
          this.uiHelperService.SwalMessageError(val.Status, val.Message);
          //this._router.navigate(['/payment-method']);
        }
      }, error: (errr: any) => {
        this.uiHelperService.SpinnerHide();
        this.uiHelperService.SwalMessageServerError();
      }
    });
  }

  CreateShurjoPayPaymemt() {
    this.uiHelperService.SpinnerShow();
    this._agentRechargeServiceService.CreateShurjoPayPayment(this.receivedAmount).subscribe({
      next: (val: Response) => {
        this.uiHelperService.SpinnerHide();
        if (val.IsSuccess) {
          window.location.href = val.Message;
        } else {
          this.uiHelperService.SwalMessageError(val.Status, val.Message);
          //this._router.navigate(['/payment-method']);
        }
      }, error: (errr: any) => {
        this.uiHelperService.SpinnerHide();
        this.uiHelperService.SwalMessageServerError();
      }
    });
  }

  CreateBkashPayment() {
    this.uiHelperService.SpinnerShow();
    this._agentRechargeServiceService.CreateBkashPayment(this.receivedAmount).subscribe({
      next: (val: Response) => {
        this.uiHelperService.SpinnerHide()
        if (val.IsSuccess) {
          window.location.href = val.Message;
        } else {
          this.uiHelperService.SwalMessageError(val.Status, val.Message);
          //this._router.navigate(['/payment-method']);
        }
      },
      error: (err: any) => {
        this.uiHelperService.SwalMessageServerError();
      }
    });
  }
}





