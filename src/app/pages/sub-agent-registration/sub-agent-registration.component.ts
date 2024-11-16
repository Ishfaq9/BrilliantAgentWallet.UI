import { Component } from '@angular/core';
import { AddressServiceService } from '../../core/services/address-service.service';
import { Division } from '../../shared/models/division.model';
import { District } from '../../shared/models/district.model';
import { SubDistrict } from '../../shared/models/sub-district.model';
import { Console, error } from 'console';
import { UIHelperService } from '../../shared/helpers/u-i-helper.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterDto } from '../../shared/models/register-dto.model';
import { AuthenticationService } from '../../core/services/authenticationService/authentication.service';
import { Response } from '../../shared/models/responses/response.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentRegDetail } from '../../shared/models/agent-reg-detail.model';
import { SessionHelper } from '../../shared/helpers/session-helper';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sub-agent-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './sub-agent-registration.component.html',
  styleUrl: './sub-agent-registration.component.scss'
})
export class SubAgentRegistrationComponent {
  regDtoForm!: FormGroup;
  phoneNumber!: string;
  division: Division[] = [];
  distric: District[] = [];
  subDistric: SubDistrict[] = [];
  agentRegDetail!: AgentRegDetail;
  AgentCheck!: string;
  
  constructor(private _formBuilder: FormBuilder, private _uIHelperService: UIHelperService,
    private _authenticationService: AuthenticationService, private _addressServiceService: AddressServiceService,
    private uiHelperService: UIHelperService, private _route: ActivatedRoute,private _router: Router) {
      //this.resetTheForm();
  }

  ngOnInit() {
    this.AgentCheck=SessionHelper.GetRole()!;
    if(this.AgentCheck=='Agent'){
      this.GetDivision();
    }else{
      this._router.navigate(['/agent-summary']);
    }
    this.regDtoForm = this._formBuilder.group({
      FullName: ['', Validators.required],
      phoneNumber:['',Validators.required],
      Division: ['', Validators.required],
      District: ['', Validators.required],
      SubDistric: ['', Validators.required],
      Postalcode: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      Address: ['', Validators.required],
      ShopName: [''],
      CommissionPercentage:['',Validators.required]
    });
  };

  GetDivision() {
    this.uiHelperService.SpinnerShow();
    this._addressServiceService.GetDivision().subscribe(result => {
      this.uiHelperService.SpinnerHide();
      if (result != '' || result != null) {
        this.division = result;
      } else {
        this._uIHelperService.SwalMessageError('No Data Found', 'Division Data is not aavilable');
      }
    }, error => {
      this._uIHelperService.SwalMessageServerError();
    });
  }

  public GetdistrictByDivisionId(event: any) {
    const value = event.target.value;
    this.uiHelperService.SpinnerShow();
    this._addressServiceService.Getdistric(value).subscribe(result => {
      this.uiHelperService.SpinnerHide();
      if (result != '' || result != null) {
        this.distric = result;
      } else {
        this._uIHelperService.SwalMessageError('No Data Found', 'distric Data is not aavilable');
      }
    }, error => {
      this._uIHelperService.SwalMessageServerError();
    });
  }

  public GetSubDistrictByDistrictId(event: any) {
    const value = event.target.value;
    this.uiHelperService.SpinnerShow();
    this._addressServiceService.GetSubDistric(value).subscribe(result => {
      this.uiHelperService.SpinnerHide();
      if (result != '' || result != null) {
        this.subDistric = result;
      } else {
        this._uIHelperService.SwalMessageError('No Data Found', 'distric Data is not aavilable');
      }
    }, error => {
      this._uIHelperService.SwalMessageServerError();
    });
  }

  onSubmit() {
    if (this.regDtoForm.valid) {
      this.agentRegDetail = {
        Id:0,
        FullName: this.regDtoForm.value.FullName,
        DivisionId: parseInt(this.regDtoForm.value.Division, 10),
        DistrictId: parseInt(this.regDtoForm.value.District, 10),
        SubDistrictId: parseInt(this.regDtoForm.value.SubDistric, 10),
        CountryId:1,
        CommissionPercentage:this.regDtoForm.value.CommissionPercentage,
        Postalcode: this.regDtoForm.value.Postalcode,
        Address: this.regDtoForm.value.Address,
        ShopName: this.regDtoForm.value.ShopName,
        //Comments: this.regDtoForm.value.Comments,
        PhoneNumber:this.regDtoForm.value.phoneNumber,
        InsertedDate: new Date(),
      };
      console.log(this.agentRegDetail);
      this.resetTheForm();
      this.uiHelperService.SpinnerShow();
      this._authenticationService.SubAgentRegistration(this.agentRegDetail).subscribe({
        next: (val: Response) => {
          this.uiHelperService.SpinnerHide();
          if (val.IsSuccess) {
            console.log("ok")
            this._uIHelperService.SwalMessageSuccess(val.Status, val.Message).then(result=>{
              if(result.isConfirmed){
                this.resetTheForm();
                //this._router.navigate(['/payment-method-reg',this.phoneNumber]);
                this._router.navigate(['/sub-agent-list']);
              
              }
            });
          } else {
            console.log("not ok")
            this.uiHelperService.SwalMessageError(val.Status, val.Message).then(result=>{
              if(result.isConfirmed){
                //this.resetTheForm();
                this._router.navigate(['/sub-agent-registration']);
              }
            });
           
          }
        }, error: (errr: any) => {
          this.uiHelperService.SpinnerHide();
          this.uiHelperService.SwalMessageServerError();
        }
      });
    }else{
      this.uiHelperService.SpinnerHide();
      this.uiHelperService.SwalMessageWarning('Warning','Invalid Data');
    }
  }

  resetTheForm(){
    this.regDtoForm = this._formBuilder.group({
      FullName: [''],
      phoneNumber:[''],
      Division: [''],
      District: [''],
      SubDistric: [''],
      Postalcode: [''],
      Address: [''],
      ShopName: [''],
      //Comments: [''],
      CommissionPercentage:['']
    });
    this.division=[];
    this.distric=[];
    this.subDistric=[];
    this.ngOnInit();
  }

}
