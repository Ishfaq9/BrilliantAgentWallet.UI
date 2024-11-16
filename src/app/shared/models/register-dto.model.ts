export class RegisterDto {
    FullName?: string;
    DivisionId: number;
    DistrictId: number;
    SubDistrictId: number;
    Postalcode?: string;
    Address?: string;
    Comments?: string;
    PhoneNumber?:string;


    constructor() {
        this.FullName = '';
            this.DivisionId = 0;
        this.DistrictId = 0;
        this.SubDistrictId = 0;
        this.Postalcode = '';
        this.Address = '';
        this.Comments = '';
        this.PhoneNumber='';
    }
}
