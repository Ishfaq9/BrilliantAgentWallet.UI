import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIHelperService } from '../../shared/helpers/u-i-helper.service';
import { SessionHelper } from '../../shared/helpers/session-helper';
import { RouteHelperService } from '../../shared/helpers/route-helper.service';

@Component({
  selector: 'app-back-from-payment-registration',
  standalone: true,
  imports: [],
  templateUrl: './back-from-payment-registration.component.html',
  styleUrl: './back-from-payment-registration.component.scss'
})
export class BackFromPaymentRegistrationComponent {
 
  MsgResult!: string;
  MsgStatus!:string;
  constructor(private _router: Router, private _route: ActivatedRoute, private _uIHelperService: UIHelperService, private routeHelperService: RouteHelperService) {
  }

  ngOnInit(): void {
    this.GetStatus();

  }


  GetStatus() {
    this._uIHelperService.SpinnerShow();
    this._route.paramMap.subscribe({
      next: (params) => {
        this._uIHelperService.SpinnerHide();
        let status = params.get('status') == null ? "" : params.get('status');
        let message = params.get('message') == null ? "" : params.get('message');
        let phone = params.get('phoneNumber') == null ? "" : params.get('phoneNumber');
        if (status == "Success") {
          this._uIHelperService.SwalMessageSuccess(status!, message!).then(result => {
            if (result.isConfirmed)
              {
               this._router.navigate(['/agent-registration',phone]);
              }
          });
        }
        else {
          this._uIHelperService.SwalMessageError(status!, message!).then(result => {
            this._router.navigate(['/terms-condition',SessionHelper.GetValue('regPhone')]);
          });
          // this._uIHelperService.SwalMessageError(status!, message!).then(result => {
          //   if (result.isConfirmed)
          //   {
          //     console.log(SessionHelper.GetValue('regPhone'));
          //     this.MsgResult=message!;
          //     this.MsgStatus=status!;
          //     this._router.navigate(['/terms-condition',SessionHelper.GetValue('regPhone')]);
          //   }
          // });
        }
      }
    });
  }
}
