export class SessionHelper {

    static SetToken = (token: string) => sessionStorage.setItem('token', token);
   
    static SetRefreshToken = (refreshToken: string) => sessionStorage.setItem('refreshToken', refreshToken);
   
    static SetUserId = (id: string) => sessionStorage.setItem('id', id);
   
    static SetUserName = (userName: string) => sessionStorage.setItem('username', userName);
   
    static SetUserPhoneNumber = (phoneNumber: string) => sessionStorage.setItem('phoneNumber', phoneNumber);
    
    static SetAgentId = (agentAccountId: string) => sessionStorage.setItem('agentAccountId', agentAccountId);

    static SetUserFullName = (userFullName: string) => sessionStorage.setItem('userFullName', userFullName);
   
    static SetTokenExpiresTime = (tokenExpiresTime: string) => sessionStorage.setItem('tokenExpiresTime', tokenExpiresTime);
   
    static SetTokenExpiresTimeNet = (tokenExpiresTimeNet: string) => sessionStorage.setItem('tokenExpiresTimeNet', tokenExpiresTimeNet);
   
    static SetRefreshTokenExpiresTimeNet = (refreshTokenExpiresTimeNet: string) => sessionStorage.setItem('refreshTokenExpiresTimeNet', refreshTokenExpiresTimeNet);
    static SetValue = (key: string , val: string) => sessionStorage.setItem(key, val);
   
    static SetRole = (role: string) => sessionStorage.setItem('role', role);

    static SetCurrentpageLength = (length: number) => sessionStorage.setItem('historyLength', length.toString());

    static SetCustNumChk = (pNumber: string) => sessionStorage.setItem('custNumChk', pNumber);

    static SetCustNumTimeChk = (NumTimeChk: Date) => sessionStorage.setItem('custNumTimeChk', NumTimeChk.toString());




    static GetToken = () => sessionStorage.getItem('token');
   
    static GetRefreshToken = () => sessionStorage.getItem('refreshToken');
   
    static GetUserId = () => sessionStorage.getItem('id');
   
    static GetUserName = () => sessionStorage.getItem('username');
   
    static GetUserPhoneNumber = () => sessionStorage.getItem('phoneNumber');
    
    static GetUserFullName = () => sessionStorage.getItem('userFullName');

    static GetAgentId = () => Number(sessionStorage.getItem('agentAccountId'));
   
    static GetTokenExpiresTime = () => sessionStorage.getItem('tokenExpiresTime');
   
    static GetTokenExpiresTimeNet = () => new Date(sessionStorage.getItem('tokenExpiresTimeNet')!);

    static GetRole = () => sessionStorage.getItem('role');
    static GetValue = (key : string) => sessionStorage.getItem(key);

    static GetRefreshTokenExpiresTimeNet = () => new Date(sessionStorage.getItem('refreshTokenExpiresTimeNet')!);

    static GetCurrentpageLength = () => Number(sessionStorage.getItem('historyLength'));

    static GetCustNumChk = () => sessionStorage.getItem('custNumChk');

    static GetCustNumTimeChk = () => new Date(sessionStorage.getItem('custNumTimeChk') as string);
   
   
    static ClearLocalStorage = () => sessionStorage.clear();
   
   
    static SetinLocalStorage = (name: string, value: string) => sessionStorage.setItem(name,value);

    static IsLocalStorageAvailable(){
        var test = 'storage';
        try {
            sessionStorage.setItem(test, "true");
            sessionStorage.removeItem(test);
            return true;
        } catch(e) {
            return false;
        }
    }
   
   }