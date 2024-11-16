import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AgentRechargeServiceService } from '../../core/services/agent-recharge-service.service';
import { Response } from '../../shared/models/responses/response.model';
import { UIHelperService } from '../../shared/helpers/u-i-helper.service';
import { TransactionServiceService } from '../../core/services/transaction-service.service';
import { SessionHelper } from '../../shared/helpers/session-helper';

@Component({
  selector: 'app-payment-methods-reg',
  standalone: true,
  imports: [],
  templateUrl: './payment-methods-reg.component.html',
  styleUrl: './payment-methods-reg.component.scss'
})
export class PaymentMethodsRegComponent {
  amount!: number;
  phoneNumber!: string;

  //router: any;
  constructor(private _router: Router, private _route: ActivatedRoute,
    private _agentRechargeServiceService: AgentRechargeServiceService,
    private uiHelperService: UIHelperService, private _transactionServiceService: TransactionServiceService) {
  }

  ngOnInit(): void {
    SessionHelper.SetCurrentpageLength(window.history.length-1);
    this.GetPhoneNumber();
    this.GetRegistrationfees();
  }
  GetPhoneNumber() {
    this._route.paramMap.subscribe({
      next: (params) => {
        let phoneNumber = params.get('phonenumber');
        this.phoneNumber = phoneNumber!.toString();
      }
    });
  }

  GetRegistrationfees() {
    this._transactionServiceService.GetRegistrationfees().subscribe(result => {
      this.amount = result;
    })
  }

  CreateNagadPayment() {
    this.uiHelperService.SpinnerShow();
    // if (this.amount = 1000) {
      this._agentRechargeServiceService.CreateNagadPaymentReg(this.amount, this.phoneNumber).subscribe({
        next: (val: Response) => {
          this.uiHelperService.SpinnerHide();
          if (val.IsSuccess) {
            window.location.href = val.Message;
          } else {
            this.uiHelperService.SwalMessageError(val.Status, val.Message);
            this._router.navigate(['/payment-method']);
          }
        }, error: (errr: any) => {
          this.uiHelperService.SpinnerHide();
          this.uiHelperService.SwalMessageServerError();
        }
      });
    // } else {
    //   this.uiHelperService.SwalMessageError('Invalid Amount', 'Amount can not be less than tk 1000');
    //   this.amount = 1000;
    // }
  }

  CreateShurjoPayPaymemt() {
    this.uiHelperService.SpinnerShow();
    // if (this.amount = 1000) {
      // console.log(this.amount);
      // console.log(this.phoneNumber);
      this._agentRechargeServiceService.CreateShurjoPayPaymentReg(this.amount, this.phoneNumber).subscribe({
        next: (val: Response) => {
          this.uiHelperService.SpinnerHide();
          if (val.IsSuccess) {
            window.location.href = val.Message;
          } else {
            this.uiHelperService.SwalMessageError(val.Status, val.Message);
            this._router.navigate(['/payment-method']);
          }
        }, error: (errr: any) => {
          this.uiHelperService.SpinnerHide();
          this.uiHelperService.SwalMessageServerError();
        }
      });
    // } else {
    //   this.uiHelperService.SwalMessageError('Invalid Amount', 'Amount can not be less than tk 1000');
    //   this.amount = 1000;
    // }
  }

  CreateBkashPayment() {
    // console.log(this.amount)
    // console.log(this.phoneNumber)
    // if (this.amount = 1000) {
      this.uiHelperService.SpinnerShow();
      this._agentRechargeServiceService.CreateBkashPaymentReg(this.amount, this.phoneNumber).subscribe({
        next: (val: Response) => {
          this.uiHelperService.SpinnerHide();
          if (val.IsSuccess) {
            window.location.href = val.Message;
          } else {
            this.uiHelperService.SwalMessageError(val.Status, val.Message);
            this._router.navigate(['/payment-method']);
          }
        },
        error: (err: any) => {
          this.uiHelperService.SpinnerHide();
          this.uiHelperService.SwalMessageServerError();
        }
      });
    // } else {
    //   this.uiHelperService.SwalMessageError('Invalid Amount', 'Amount can not be less than tk 1000');
    //   this.amount = 1000;
    // }
  }

}
