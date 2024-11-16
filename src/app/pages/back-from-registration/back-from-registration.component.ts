import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIHelperService } from '../../shared/helpers/u-i-helper.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-from-registration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-from-registration.component.html',
  styleUrl: './back-from-registration.component.scss'
})
export class BackFromRegistrationComponent {

  MsgResult!: string;
  MsgStatus!:string;
  constructor(private _router: Router, private _route: ActivatedRoute, private _uIHelperService: UIHelperService) {
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
        this.MsgResult=message!;
        this.MsgStatus=status!;
        // if (status == "Success") {
        //   this._uIHelperService.SwalMessageSuccess(status!, message!).then(result => {
        //     if (result.isConfirmed)
        //       {
        //        this._router.navigate(['/agent-registration',message]);
        //       }

        //   });
        // }
        // else {
        //   this._uIHelperService.SwalMessageError(status!, message!).then(result => {
        //     if (result.isConfirmed)
        //       this.MsgResult=message!;
        //     this.MsgStatus=status!;
        //     //this._router.navigate(['/terms-condition',message]);
        //   });
        // }
      }
    });
  }
}
