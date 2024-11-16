import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TopUpHistoryServiceService } from '../../core/services/top-up-history-service.service';
import { error } from 'console';
import { CommonModule, DatePipe } from '@angular/common';
import { CustomerRechargeHistoryDto } from '../../shared/models/customer-recharge-history-dto.model';
import { UIHelperService } from '../../shared/helpers/u-i-helper.service';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-top-up-history',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './top-up-history.component.html',
  styleUrl: './top-up-history.component.scss'
})
export class TopUpHistoryComponent {
  dateFrom!: string| null;;
  dateTo!: string| null;;
  customerPhoneNumber: string = '';
  CustomerRechargeHistoryDto: CustomerRechargeHistoryDto[] = [];
  minDate!: string| null;
  TotalAmount: number = 0;
  constructor(private _topUpHistoryServiceService: TopUpHistoryServiceService, private uiHelperService: UIHelperService,private datePipe: DatePipe) { }
  updateMinDate() {
    this.minDate = this.dateFrom; // Update minimum date when dateFrom changes
}

ngOnInit(){
  this.dateFrom = this.datePipe.transform(new Date, 'yyyy-MM-dd');
  this.dateTo = this.dateFrom;
  this.GetTopUpHistory();
}

  GetTopUpHistory() {
    if (this.dateFrom == null || this.dateTo == null) {
      this.uiHelperService.SwalMessageWarning('Warning', 'Please Select the date');
    } else {
      this.TotalAmount =0;
      this.uiHelperService.SpinnerShow();
      this._topUpHistoryServiceService.GetTopUpHistory(this.dateFrom, this.dateTo, this.customerPhoneNumber)
        .subscribe(
          result => {
            this.uiHelperService.SpinnerHide();
            if (result != null && result.length > 0) {
              console.log(result);
              this.CustomerRechargeHistoryDto = result;
              this.TotalAmount = this.CustomerRechargeHistoryDto.reduce((sum, current) => sum + current.Amount, 0);
            } else {
              this.CustomerRechargeHistoryDto = [];
              this.uiHelperService.SwalMessageWarning('No Data Found', 'No Top-Up found for the selected dates.');
            }
          },
          error => {
            //console.error("Error occurred while fetching top-up history:", error);
            this.uiHelperService.SpinnerHide();
            this.uiHelperService.SwalMessageServerError();
          }
        );
    }

  }
}
