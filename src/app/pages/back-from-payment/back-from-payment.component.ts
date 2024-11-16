import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIHelperService } from '../../shared/helpers/u-i-helper.service';
import { RouteHelperService } from '../../shared/helpers/route-helper.service';
import { SessionHelper } from '../../shared/helpers/session-helper';

@Component({
  selector: 'app-back-from-payment',
  standalone: true,
  imports: [],
  templateUrl: './back-from-payment.component.html',
  styleUrl: './back-from-payment.component.scss'
})
export class BackFromPaymentComponent implements OnInit  {
  
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
        if(status == "Success"){
          this._uIHelperService.SwalMessageSuccess(status!, message!).then(result => {
            //this.routeHelperService.GoBackToFirstUrl(SessionHelper.GetCurrentpageLength());
            this._router.navigate(['/agent-recharge']);
          });
          //this._uIHelperService.SwalMessageSuccess(status!, message!);
          //this._router.navigate(['/agent-recharge']);
        }
        else{
          this._uIHelperService.SwalMessageError(status!, message!).then(result => {
            //this.routeHelperService.GoBackToFirstUrl(SessionHelper.GetCurrentpageLength());
            this._router.navigate(['/agent-recharge']);
          });
          this._uIHelperService.SwalMessageError(status!, message!);
          this._router.navigate(['/agent-recharge']);
        }
      }
    });
  }

}
