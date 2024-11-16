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

@Component({
  selector: 'app-agent-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agent-registration.component.html',
  styleUrl: './agent-registration.component.scss'
})
export class AgentRegistrationComponent {

  regDtoForm!: FormGroup;
  phoneNumber!: string;
  division: Division[] = [];
  district: District[] = [];
  subDistrict: SubDistrict[] = [];
  agentRegDetail!: AgentRegDetail;

  constructor(private _formBuilder: FormBuilder, private _uIHelperService: UIHelperService,
    private _authenticationService: AuthenticationService, private _addressServiceService: AddressServiceService,
    private uiHelperService: UIHelperService, private _route: ActivatedRoute, private _router: Router) {
    //this.resetTheForm();

  }

  ngOnInit() {
    this.GetDivision();
    this.GetPhoneNumber();
    this.regDtoForm = this._formBuilder.group({
      FullName: ['', Validators.required],
      Division: ['', Validators.required],
      District: ['', Validators.required],
      SubDistric: ['', Validators.required],
      Postalcode: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      Address: ['', Validators.required],
      ShopName: ['']
    });
  };

  GetPhoneNumber() {
    this._route.paramMap.subscribe({
      next: (params) => {
        let phoneNumber = params.get('phonenumber');
        this.phoneNumber = phoneNumber!.toString();
      }
    });
  }

  GetDivision() {
    this._addressServiceService.GetDivision().subscribe(result => {
      if (result != '' || result != null) {
        this.division = result;
      } else {
        this._uIHelperService.SwalMessageError('No Data Found', 'Division Data is not avilable');
      }
    }, error => {
      this._uIHelperService.SwalMessageServerError();
    });
  }

  public GetdistrictByDivisionId(event: any) {

    this.district = [];
    this.subDistrict = [];
  

    const value = event.target.value;
    if(value != '')
    {
      this.uiHelperService.SpinnerShow();
      this._addressServiceService.Getdistric(value).subscribe(result => {
        this.uiHelperService.SpinnerHide();
        if (result != '' || result != null) {
          this.district = result;
        } else {
          this._uIHelperService.SwalMessageError('No Data Found', 'distric Data is not aavilable');
        }
      }, error => {
        this._uIHelperService.SwalMessageServerError();
      });
    }
    this.regDtoForm.controls['District'].setValue('');
    this.regDtoForm.controls['SubDistric'].setValue('');

  }

  public GetSubDistrictByDistrictId(event: any) {
    this.subDistrict = [];


    const value = event.target.value;
    if(value != '')
    {
      this.uiHelperService.SpinnerShow();
      this._addressServiceService.GetSubDistric(value).subscribe(result => {
        this.uiHelperService.SpinnerHide();
        if (result != '' || result != null) {
          this.subDistrict = result;
        } else {
          this._uIHelperService.SwalMessageError('No Data Found', 'distric Data is not aavilable');
        }
      }, error => {
        this._uIHelperService.SwalMessageServerError();
      });
    }
    this.regDtoForm.controls['SubDistric'].setValue('');
  }

  onSubmit() {
    if (this.regDtoForm.valid) {
      this.agentRegDetail = {
        Id: 0,
        FullName: this.regDtoForm.value.FullName,
        DivisionId: parseInt(this.regDtoForm.value.Division, 10),
        DistrictId: parseInt(this.regDtoForm.value.District, 10),
        SubDistrictId: parseInt(this.regDtoForm.value.SubDistric, 10),
        CountryId: 1,
        Postalcode: this.regDtoForm.value.Postalcode,
        Address: this.regDtoForm.value.Address,
        ShopName: this.regDtoForm.value.ShopName,
        //Comments: this.regDtoForm.value.Comments,
        PhoneNumber: this.phoneNumber,
        InsertedDate: new Date(),
        CommissionPercentage: 0
      };
      console.log(this.agentRegDetail);
      this._uIHelperService.SpinnerShow();
      this._authenticationService.AgentRegistration(this.agentRegDetail).subscribe({
        next: (val: Response) => {
          this._uIHelperService.SpinnerHide();
          if (val.IsSuccess) {
            this._uIHelperService.SwalMessageSuccess(val.Status, val.Message).then(result => {
              if (result.isConfirmed) {
                //this.resetTheForm();
                //this._router.navigate(['/payment-method-reg',this.phoneNumber]);
                this._router.navigate(['/back-from-registration', val.Status, val.Message]);
                //this._router.navigate(['/terms-condition']);

              }
            });
          } else if (val.IsSuccess == false && val.Status == 'Warning') {
            this.uiHelperService.SwalMessageError(val.Status, val.Message).then(result => {
              if (result.isConfirmed) {
                this.resetTheForm();
                this._router.navigate(['/terms-condition', this.phoneNumber]);
              }
            });
          } else {
            this.uiHelperService.SwalMessageError(val.Status, val.Message).then(result => {
              if (result.isConfirmed) {
                this.resetTheForm();
                //this._router.navigate(['/terms-condition']);

              }
            });

          }
        }, error: (errr: any) => {
          this._uIHelperService.SpinnerHide();
          this.uiHelperService.SwalMessageServerError();
          this.resetTheForm();
        }
      });
    } else {
      this.uiHelperService.SwalMessageWarning('Warning', 'Invalid Data');
      this.resetTheForm();
    }
  }

  resetTheForm() {
    this.regDtoForm = this._formBuilder.group({
      FullName: [''],
      Division: [''],
      District: [''],
      SubDistric: [''],
      Postalcode: [''],
      Address: [''],
      ShopName: ['']
    });
    this.division = [];
    this.district = [];
    this.subDistrict = [];
    this.ngOnInit();
  }

}
