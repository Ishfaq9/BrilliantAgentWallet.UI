import { Component, OnInit, ViewChild } from '@angular/core';
import { AgentBalanceComponent } from '../../components/agent-balance/agent-balance.component';
import { FormsModule } from '@angular/forms';
import { CustomerRechargeServiceService } from '../../core/services/customer-recharge-service.service';
import { Response } from '../../shared/models/responses/response.model';
import { Router } from '@angular/router';
import { UIHelperService } from '../../shared/helpers/u-i-helper.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgentBalanceDto } from '../../shared/models/agent-balance-dto.model';
import { environment } from '../../../environments/environment';
import { SessionHelper } from '../../shared/helpers/session-helper';
import { flush } from '@angular/core/testing';
@Component({
  selector: 'app-customer-recharge',
  standalone: true,
  imports: [AgentBalanceComponent, FormsModule, CommonModule, RouterModule],
  templateUrl: './customer-recharge.component.html',
  styleUrl: './customer-recharge.component.scss'
})
export class CustomerRechargeComponent implements OnInit {
  @ViewChild(AgentBalanceComponent) agentBalanceComponent!: AgentBalanceComponent;

  topupAmount!: number;
  topupNumber!: string;
  agentBalanceCheck!: number;
  AgentBalanceDto!: AgentBalanceDto;
  checkbox: boolean = false;
  ReferralCode!: string;
  constructor(private _customerRechargeServiceService: CustomerRechargeServiceService,
    private router: Router,
    private uiHelperService: UIHelperService) {
    this.AgentBalanceDto = new AgentBalanceDto();

  }
  ngOnInit(): void {
    this.ReferralCode = this.AgentBalanceDto.ReferralCode;
  }

  checkBoxCheck(event: any) {
    this.checkbox = event.target.checked ? true : false;
    if (!this.checkbox) {
      //this.ReferralCode = '';
      this.ngOnInit();
    }
  }

  topUp() {

    if (this.checkbox) {
      this.topUpWithRC();
    } else {
      this.topUpWithOutRC();
    }
  }

  topUpWithOutRC() {
    var topupNumber =this.topupNumber.startsWith('88')?this.topupNumber:'88'+this.topupNumber; 
    //var topupNumber = "";
    // if (this.topupNumber.toString().startsWith('1')) {
    //   this.topupNumber = '0' + this.topupNumber;
    // }
    //<table class="table table-bordered" style="font-size:15px; color: #1a3a54; font-weight: 500;">

    if (this.topupNumber == '' || this.topupAmount == null || !this.topupNumber) {
      this.uiHelperService.SwalMessageWarning('Warning', 'Please Enter Amount and Phone Number');
    }
    else if (SessionHelper.GetCustNumChk() == topupNumber && SessionHelper.GetCustNumTimeChk() >= new Date()) {
      this.uiHelperService.SwalMessageWarning('Warning', `You can give top-up in same number after ${Math.round((SessionHelper.GetCustNumTimeChk().getTime() - new Date().getTime()) / 1000)} seconds `);
    }
    else if (this.AgentBalanceDto.AgentBalance < 1) {
      this.uiHelperService.SwalMessageWarning('Warning', 'You Do not Have Sufficient Balance To Top-up');
    }
    else if (this.topupAmount < this.AgentBalanceDto.MinimumCustomerRechargePerTransection) {
      this.uiHelperService.SwalMessageWarning('Warning', `Minimum transaction amount ${this.AgentBalanceDto.MinimumCustomerRechargePerTransection}TK`);
    }
    // else if (this.topupNumber == '' || this.topupAmount == null || !this.topupNumber) {
    //   this.uiHelperService.SwalMessageWarning('Warning', 'Please Enter Amount and Phone Number');
    // }
    else if (!this.validateAmount(this.topupAmount)) {
      this.uiHelperService.SwalMessageWarning('Invalid Balance', 'Please enter a valid balance amount.');
      this.topupAmount = 1;
    }
    else if (this.AgentBalanceDto.AgentBalance < this.topupAmount) {
      this.uiHelperService.SwalMessageWarning('Insufficient Balance', 'Please Enter Amount less than ' + this.AgentBalanceDto.AgentBalance);
    }
    else if (!this.isValidPhoneNumber(this.topupNumber)) {
      this.uiHelperService.SwalMessageWarning('Invalid Phone Number', 'Please Enter a valid phone number');

    }
    else {
      const html = `<div >
        <table class="table table-borderless">
          <tr>
            <td style="font-weight: 500">Number:</td>
            <td class="text-start">${this.topupNumber}</td>
          </tr>
          <tr>
            <td style="font-weight: 500">Amount:</td>
            <td class="text-start">${this.topupAmount + " " + "Tk"} </td>
          </tr>
        </table></div>`;


      this.uiHelperService.SwalMessageWarningConformation('Confirm Top-Up', html, true).then(result => {
        if (result.isConfirmed) {
          SessionHelper.SetCustNumChk(topupNumber);
          var checkDate = new Date();
          SessionHelper.SetCustNumTimeChk(new Date(checkDate.setMinutes(checkDate.getMinutes() + 1)));
          this.uiHelperService.SpinnerShow();
          this._customerRechargeServiceService.CustomerRecharge(this.topupAmount, this.topupNumber).subscribe({
            next: (val: Response) => {
              this.uiHelperService.SpinnerHide();
              if (val.IsSuccess) {
                //alert("Top-Up successfully!" + "\rsucess code: " + val.IsSuccess + "\rmessage: " + val.Message + "\rstatus code: " + val.Status);
                this.uiHelperService.SwalMessageSuccess('Success', 'Top-Up Successfully Done!');
                this.topupAmount = NaN;
                this.topupNumber = '';
                //this.agentBalanceComponent.GetAgentBalance();
                //this.agentBalance = this.agentBalanceComponent.agentBalance;
              } else {
                this.uiHelperService.SwalMessageError(val.Status, val.Message);
                //window.location.reload();
              }
              this.agentBalanceComponent.GetAgentBalance();
              this.AgentBalanceDto = this.agentBalanceComponent.AgentBalanceDto;
            },
            error: (err: any) => {
              this.uiHelperService.SpinnerHide();
              this.uiHelperService.SwalMessageServerError();
              this.agentBalanceComponent.GetAgentBalance();
              this.AgentBalanceDto = this.agentBalanceComponent.AgentBalanceDto;
            }
          });
        }
      });
    }

  }

  topUpWithRC() {
    if (this.topupNumber == '' || this.topupAmount == null || !this.topupNumber) {
      this.uiHelperService.SwalMessageWarning('Warning', 'Please Enter Amount and Phone Number');
    }
    else if (this.AgentBalanceDto.ReferralCode == '' || this.AgentBalanceDto.ReferralCode == null) {
      this.uiHelperService.SwalMessageWarning('Warning', 'Enter Referral Code.');
    }
    else if (this.AgentBalanceDto.AgentBalance < 1) {
      this.uiHelperService.SwalMessageWarning('Warning', 'You Do not Have Sufficient Balance To Top-up');

    } else if (!this.validateAmount(this.topupAmount)) {
      this.uiHelperService.SwalMessageWarning('Invalid Balance', 'Please enter a valid balance amount.');
    } else if (this.topupAmount < this.AgentBalanceDto.MinimumCustomerRechargeForRC) {
      this.uiHelperService.SwalMessageWarning('Warning', `Minimum transaction amount for referral: ${this.AgentBalanceDto.MinimumCustomerRechargeForRC} TK.`);
    } else if (this.AgentBalanceDto.AgentBalance < this.topupAmount) {
      this.uiHelperService.SwalMessageWarning('Insufficient Balance', 'Please Enter Amount less than ' + this.AgentBalanceDto.AgentBalance);
    }
    else if (!this.isValidPhoneNumber(this.topupNumber)) {
      this.uiHelperService.SwalMessageWarning('Invalid Phone Number', 'Please Enter a valid phone number');
    } else if (this.ReferralCode != this.AgentBalanceDto.ReferralCode) {
      this.uiHelperService.SwalMessageWarning('Invalid Referral Code', 'Please Enter a Correct Referral Code');
    }
    else {

      const html = `<div >
      <table class="table table-borderless">
        <tr>
          <td style="font-weight: 500">Number:</td>
          <td class="text-start">${this.topupNumber}</td>
        </tr>
        <tr>
          <td style="font-weight: 500">Amount:</td>
          <td class="text-start">${this.topupAmount + " " + "Tk"} </td>
        </tr>
         <tr>
          <td style="font-weight: 500">Referral Code:</td>
          <td class="text-start">${this.AgentBalanceDto.ReferralCode + " "} </td>
        </tr>
      </table></div>`;

      this.uiHelperService.SwalMessageWarningConformation('Confirm Top-Up', html, true).then(result => {
        if (result.isConfirmed) {
          this.uiHelperService.SpinnerShow();
          this._customerRechargeServiceService.CustomerRechargeWithRC(this.topupAmount, this.topupNumber, this.ReferralCode).subscribe({
            next: (val: Response) => {
              this.uiHelperService.SpinnerHide();

              if(val.IsSuccess)
              {
                this.uiHelperService.SwalMessageSuccess(val.Status, val.Message);
              }else{
                this.uiHelperService.SwalMessageError(val.Status, val.Message);
              }
              this.topupAmount = NaN;
              this.topupNumber = '';
              this.ReferralCode = '';
              var element = <HTMLInputElement> document.getElementById("flexCheckDefault");
              element.checked = false;
              this.checkbox= false;
              this.agentBalanceComponent.GetAgentBalance();
              this.AgentBalanceDto = this.agentBalanceComponent.AgentBalanceDto;
            },
            error: (err: any) => {
              this.uiHelperService.SpinnerHide();
              this.uiHelperService.SwalMessageServerError();
              this.agentBalanceComponent.GetAgentBalance();
              this.AgentBalanceDto = this.agentBalanceComponent.AgentBalanceDto;
            }

          });
        }

      });
    }
  }


  validateAmount(value: number): boolean {
    if (value < 1) {
      return false;
    }
    return true;
  }
  updateAgentBalance(agentBalanceDto: AgentBalanceDto) {
    this.AgentBalanceDto = agentBalanceDto;
    this.ngOnInit();
  }
  isValidPhoneNumber(phoneNumber: string): boolean {
    //return /^01\d{9}$|^02\d{9}$/.test(phoneNumber.toString());
    const regex = /^(8801|01)\d{9}$/;
    console.log(phoneNumber)
    return regex.test(phoneNumber);
  }

}
