import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { SubDistrict } from '../../shared/models/sub-district.model';
import { District } from '../../shared/models/district.model';
import { Division } from '../../shared/models/division.model';
import { AgentLocatorDto } from '../../shared/models/agent-locator-dto.model';

@Injectable({
  providedIn: 'root'
})
export class AddressServiceService {
  private baseUrl = environment.baseApiUrl + 'Address/'
  constructor(private _http: HttpClient) { }

  GetDivision(): Observable<any> {
    return this._http.get<Division>(this.baseUrl + 'GetDivision');
  }
  
  GetDistrict():Observable<any>{
    return this._http.get<District>(this.baseUrl+'GetdDistrict');
  }

  GetAgentAddress(districId:number,subDistricId:number,postalCode:string):Observable<any>{
    return this._http.get<AgentLocatorDto>(this.baseUrl+'GetAgentAddress?districId='+districId+'&subDistricId='+subDistricId+'&postalCode='+postalCode);
  }

  Getdistric(id:number):Observable<any>{
    return this._http.get<District>(this.baseUrl+'GetdistrictByDivisionId?divisionId='+id);
  }

  GetSubDistric(id:number): Observable <any>{
    return this._http.get<SubDistrict>(this.baseUrl+'GetSubDistrictByDistrictId?districtId='+id);
  }

}
