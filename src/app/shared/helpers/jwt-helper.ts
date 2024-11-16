import { jwtDecode } from "jwt-decode";

export class JwtHelper {
    //jwtToken: any;
    private decodedToken: { [key: string]: any; } = {};
    constructor() {}


    DecodeToken(jwtToken: string) {
        if (jwtToken) {
            return this.decodedToken = jwtDecode(jwtToken);
        }
        return null;
    }

    GetClaims(keyName: string): any {
        if(this.decodedToken){
            keyName = keyName.toLowerCase() 
            for(let key in this.decodedToken){
                var keyArray = key.split('/');
                if(keyArray[keyArray.length-1] == keyName){
                    return this.decodedToken[key];
                }
            }
        }
        return null;
    }
    
}