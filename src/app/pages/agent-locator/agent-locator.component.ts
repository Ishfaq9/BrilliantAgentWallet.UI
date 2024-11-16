import { Component, ElementRef, ViewChild } from '@angular/core';
import { AddressServiceService } from '../../core/services/address-service.service';
import { District } from '../../shared/models/district.model';
import { UIHelperService } from '../../shared/helpers/u-i-helper.service';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { SubDistrict } from '../../shared/models/sub-district.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AgentLocatorDto } from '../../shared/models/agent-locator-dto.model';
import { RegularModule } from '../../shared/modules/regular.module';
import { MaterialModule } from '../../shared/modules/material.module';
import { AgentNoticeBoard } from '../../shared/models/agent-notice-board.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agent-locator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './agent-locator.component.html',
  styleUrl: './agent-locator.component.scss'
})
export class AgentLocatorComponent {

  district: District[] = [];
  subDistrict: SubDistrict[] = [];
  regDtoForm!: FormGroup;

  districId!: number;
  subDistricId!: number;
  postalCode!: string;
  agentLocatorDto: AgentLocatorDto[] = [];
  @ViewChild('scrollTarget') scrollTarget!: ElementRef;
  constructor(private _addressServiceService: AddressServiceService, private _uIHelperService: UIHelperService
    , private _formBuilder: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {

    this.GetDristrict();
    this.regDtoForm = this._formBuilder.group({
      District: [''],
      SubDistric: [''],
      Postalcode: ['',],
    });
  };

  GetDristrict() {
    this.district = [];
    this.subDistrict = [];
    this._addressServiceService.GetDistrict().subscribe(result => {
      if (result != null || result != '') {
        this.district = result;
      } else {
        this.district = [];
        this._uIHelperService.SwalMessageError('No Data Found', 'No District Data is available');
      }
    }, error => {
      this._uIHelperService.SwalMessageServerError();
    });
  }

  public GetSubDistrictByDistrictId(event: any) {
    this.subDistrict = [];
    const value = event.target.value;
    if (value != '') {
      this._uIHelperService.SpinnerShow();
      this._addressServiceService.GetSubDistric(value).subscribe(result => {
        this._uIHelperService.SpinnerHide();
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

  Submit() {
    this.districId = this.regDtoForm.get('District')?.value || 0;
    this.subDistricId = this.regDtoForm.get('SubDistric')?.value || 0;
    this.postalCode = this.regDtoForm.get('Postalcode')?.value || '';

    var html = `<p>অনুগ্রহ করে <b>জেলা</b> অথবা <b>পোস্ট কোড</b> নির্বাচন করুন</p>`;
    var html2 = `<p>আপনার <b>থানায়</b>  যদি এজেন্ট খুঁজে না পাওয়া যায় তাহলে শুধু <b>জেলা</b>  নির্বাচন করে অন্য এজেন্ট খুঁজে নিন এবং প্রতি রিচার্জে উপভোগ করুন <b>10%</b>  বোনাস<p>`;

    if (this.districId == 0 && this.postalCode == '') {
      this._uIHelperService.SwalMessageAgentLocator('সতর্কতা', html, true, 1);
    } else {
      this._addressServiceService.GetAgentAddress(this.districId, this.subDistricId, this.postalCode).subscribe(result => {
        this._uIHelperService.SpinnerHide();
        this.agentLocatorDto = result;
        if (this.agentLocatorDto.length > 0) {
          this.agentLocatorDto = result;
          this.scrollToResult();
        } else {
          this._uIHelperService.SwalMessageAgentLocator('কোন এজেন্ট খুঁজে পাওয়া যায়নি', html2, true, 2);
        }
      }, error => {
        this._uIHelperService.SwalMessageServerError();
      });
    }

  }

  scrollToResult() {
    if (this.scrollTarget) {
      this.scrollTarget.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  resetTheForm() {
    this.regDtoForm = this._formBuilder.group({
      District: [''],
      SubDistric: [''],
      Postalcode: [''],
    });
    //this.districId = 0;
    //console.log(this.districId);
    this.agentLocatorDto = [];
    this.district = [];
    this.subDistrict = [];
    this.ngOnInit();
  }





}
