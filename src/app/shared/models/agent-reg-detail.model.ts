export class AgentRegDetail {
    Id: number;
    FullName: string;
    DivisionId: number;
    DistrictId: number;
    CountryId:number;
    SubDistrictId: number;
    Postalcode: string;
    Address: string;
    ShopName: string;
    //Comments: string;
    PhoneNumber: string;
    InsertedDate: Date;
    CommissionPercentage:number;
    constructor() {
        this.Id = 0;
        this.FullName = '';
        this.DivisionId = 0;
        this.DistrictId = 0;
        this.SubDistrictId = 0;
        this.CountryId=0;
        this.Postalcode = '';
        this.Address = '';
        this.ShopName = '';
        //this.Comments = '';
        this.PhoneNumber = '';
        this.InsertedDate = new Date();
        this.CommissionPercentage=0;
    }
}
