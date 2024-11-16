import { CommonModule, PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authenticationService/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '../../shared/models/responses/response.model';
import { UIHelperService } from '../../shared/helpers/u-i-helper.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { SessionHelper } from '../../shared/helpers/session-helper';
import { RouteHelperService } from '../../shared/helpers/route-helper.service';


@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [FormsModule, CommonModule, FooterComponent],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.scss'
})
export class TermsAndConditionsComponent implements OnInit {

  checkboxChecked: boolean = false;
  phoneNumber!: string;
  DecodedUrl: string='';
  constructor(private _authenticationService: AuthenticationService, private _route: ActivatedRoute
    , private _uiHelperService: UIHelperService, private _router: Router,  private platformLocation: PlatformLocation
  , private routeHelperService: RouteHelperService) {
  }
  ngOnInit() {
    //this.routeHelperService.SetPopStateReg();
    this.GetPhoneNumber();
    //this.ExistingUserCheck();
    this.InitialCheck();
  }

  GetPhoneNumber() {
    this._route.paramMap.subscribe({
      next: (params) => {
        let phoneNumber = params.get('phonenumber');
        this.phoneNumber = phoneNumber!.toString();
        var encodedUrl = params.get('encodedUrl');
        SessionHelper.SetValue('regPhone', this.phoneNumber);
        // if(encodedUrl != null){
        //   this.DecodedUrl = decodeURIComponent(encodedUrl);
        //   this.platformLocation.onPopState(() => {
        //     window.location.href = this.DecodedUrl;
        //   });
        // }

      }
    });
  }

  Submit() {
    this._authenticationService.TermsConditionAccept(this.checkboxChecked, this.phoneNumber).subscribe({
      next: (res: Response) => {
        if (res.IsSuccess) {
          if(res.Status == 'Redirect'){
            this._uiHelperService.SwalMessageWarning(res.Status, res.Message).then(result => {
                if (result.isConfirmed) {
                  this._router.navigate(['/agent-registration', this.phoneNumber]);
                }
            });
          }
          else if(res.Status == 'Warning'){
            this._router.navigate(['/back-from-registration', res.Status, res.Message]);
          }else{
            this._router.navigate(['/payment-method-reg', this.phoneNumber]);
          }

        } else {
            this._uiHelperService.SwalMessageError(res.Status, res.Message).then(result => {
              if (result.isConfirmed) {
                this.checkboxChecked = false;
              }
            });
        }
        // if (res.IsSuccess) {
        //   this._router.navigate(['/payment-method-reg', this.phoneNumber]);
        // } else {
        //   if (res.Status == 'Warning') {
        //     this._uiHelperService.SwalMessageWarning(res.Status, res.Message).then(result => {
        //       if (result.isConfirmed) {
        //         this._router.navigate(['/agent-registration', this.phoneNumber]);
        //       }
        //     });
        //   } else {
        //     this._uiHelperService.SwalMessageError(res.Status, res.Message).then(result => {
        //       if (result.isConfirmed) {
        //         this.checkboxChecked = false;
        //       }
        //     });
        //   }
        // }
      },
      error: (err: any) => {
        this._uiHelperService.SwalMessageServerError();
      }
    });
  }

  InitialCheck() {
    this._authenticationService.DipositeCheck(this.checkboxChecked, this.phoneNumber).subscribe({
      next: (res: Response) => {
        if (res.IsSuccess) {
          if(res.Status == 'Redirect'){
            this._uiHelperService.SwalMessageWarning(res.Status, res.Message).then(result => {
              if (result.isConfirmed) {
                this._router.navigate(['/agent-registration', this.phoneNumber]);
              }
          });
          }
          else if(res.Status == 'Warning'){
            this._router.navigate(['/back-from-registration', res.Status, res.Message]);
          }

        } else {
            this._uiHelperService.SwalMessageError(res.Status, res.Message).then(result => {
              if (result.isConfirmed) {
                this.checkboxChecked = false;
              }
            });
        }
      },
      error: (err: any) => {
        this._uiHelperService.SwalMessageServerError();
      }
    });
  }

  // ExistingUserCheck(){
  //    this._authenticationService.ExistingUserCheck(this.phoneNumber).subscribe({
  //     next: (res: Response) => {
  //       if (!res.IsSuccess) {
  //         this._uiHelperService.SwalMessageError(res.Status, res.Message).then(result => {
  //           if (result.isConfirmed) {
  //             this._router.navigate(['/payment-method-reg', this.phoneNumber]);
  //           }
  //         });
  //       }
  //     },
  //     error: (err: any) => {
  //       this._uiHelperService.SwalMessageServerError();
  //     }
  //   }); 
  // }

  /*   Submit() {
      
      this._router.navigate(['/agent-registration', this.phoneNumber]);
    } */

}


