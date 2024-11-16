import { inject } from "@angular/core";


export class CookieHelper {

    // static SetRefreshToken (refreshToken: string, tokenExpiration: number | Date) {
    //     var a = `refreshToken=${refreshToken}; ${new Date( tokenExpiration )}; SameSite=None; Secure`;
    //     console.log(a);
    //     document.cookie = "jshdjahdja=jsdhfkjsdhf";
    // }

    

    static SetRefreshToken = (refreshToken: string, tokenExpiration: number | Date) => document.cookie = `refreshToken=${refreshToken}; ${new Date( tokenExpiration )}; path=/; SameSite=None; Secure`;
    //static SetRefreshToken = (refreshToken: string, tokenExpiration: number | Date) => document.cookie = "refreshToken="+refreshToken+";"+new Date(tokenExpiration)+"; path=/";
    //static SetRefreshToken = (refreshToken: string, tokenExpiration: number | Date) => document.cookie = "refreshToken=fghfghfhf; path=/";
   
    // static SetRefreshToken (refreshToken: string, tokenExpiration: number | Date){
    //     var cookieService = inject(CookieService);
    //     // cookieService.set("refreshToken", refreshToken, new Date( tokenExpiration ), '/', undefined, true, "None");
    //     cookieService.set("refreshToken", refreshToken, new Date( tokenExpiration ));
    // }

    static ClearAllCookies = () => document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });


    //this._cookieService.set('refreshToken',jwtToken.RefreshToken);
    // this._cookieService.set(
    //   'refreshToken',jwtToken.RefreshToken,
    //   new Date( jwtToken.RefreshTokenExpiration ),
    //   //undefined,
    //   undefined,
    //   undefined,
    //   true
    // );
}