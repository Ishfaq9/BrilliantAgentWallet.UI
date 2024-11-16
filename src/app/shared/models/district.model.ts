export class District {
  Id: number;
  Name: string;
  NameInBangla?: string;
  DivisionId: number;

  constructor() {
    this.Id = 0;
    this.Name = '';
    this.NameInBangla = '';
    this.DivisionId = 0;
  }
}
