import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/authenticationService/authentication.service';
import { Response } from '../../shared/models/responses/response.model';
import { JwtToken } from '../../shared/models/authentication/jwt-token.model';
import { UIHelperService } from '../../shared/helpers/u-i-helper.service';
import { PlatformLocation } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-brilliant-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brilliant-login.component.html',
  styleUrl: './brilliant-login.component.scss',
})
export class BrilliantLoginComponent implements OnInit {

  MsgStatus!:string;
  MsgResult!: string;
  DecodedUrl: string='';
  Token!: string | null;
  PhoneNumber!: string | null;

  constructor(private _route: ActivatedRoute, private authenticationService: AuthenticationService,
    private _uIHelperService: UIHelperService, private platformLocation: PlatformLocation,
    private router: Router
  ) { 
  }

  // constructor(){}

  async ngOnInit() {
    environment.isBrilliantApp = true;
    this.GetParamValue();
    this.Login();

    // if(this.authenticationService.IsLoggedIn()){
    //   //this.CheckAndGoBack();
    //   this.authenticationService.LogoutWithoutRedirect();
    //   window.history.back();
    // }else{
    //   this.Login();
    // }
    
  }

  // CheckAndGoBack() {
  //   debugger;
  //   const referrerPathname = new URL(document.referrer).pathname;
  //   if (referrerPathname === environment.baseClientPath) {
  //     window.history.back();
  //   }
  // }

  


  GetParamValue(){
    this._route.paramMap.subscribe({
      next: async (params) => {
        this.Token = params.get('token');
        this.PhoneNumber = params.get('phone-number');
        var encodedUrl = params.get('encodedUrl');
        if(encodedUrl != null){
          this.DecodedUrl = decodeURIComponent(encodedUrl);
          // this.platformLocation.onPopState(() => {
          //   this.authenticationService.LogoutWithoutRedirect();
          //   this.MsgStatus ="Logout";
          //   this.MsgResult = "You are about to logout!";
          //   window.location.href = this.DecodedUrl;
          // });
        }
      }, error: (err: any) => {
        //this._uIHelperService.SwalMessageError('Invalid','Params Not Found');
      }
    });
  }

  async Login(){
    this._uIHelperService.SpinnerShow();
    if (this.Token != null && this.PhoneNumber != null) {
      // this.MsgStatus = "Loading..."
      // this.MsgResult = "..."
      this.authenticationService.BrilliantLogin(this.Token!, this.PhoneNumber!).subscribe({
        next: async (res) => {
          if (res.IsSuccess) {
            var tokenObj = res.ObjResponse as JwtToken;
            this.authenticationService.StoreToken(tokenObj);
            //await this.sleep(10000)
            this._uIHelperService.SpinnerHide();
            
            this.authenticationService.SignIncallBack(this._route.snapshot.queryParams);
          } else {
            this._uIHelperService.SpinnerHide();
            // this._uIHelperService.SwalMessageError(res.Status, res.Message).then(result => {
            //   if (result.isConfirmed) {
              this.MsgStatus =res.Status;
              this.MsgResult = res.Message;

            //   }
            // });
          }
        },
        error: (err: any) => {
          this._uIHelperService.SpinnerHide();
          this._uIHelperService.SwalMessageServerError();
        }
      });
    }else{
      if(this.MsgStatus == null){
        this._uIHelperService.SpinnerHide();
        this.MsgStatus = ' Unauthorized';
        this.MsgResult= ' Authentiacation Error';
      }
    }
  }

  async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  } 

}
