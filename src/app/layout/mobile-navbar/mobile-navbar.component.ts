import { Component, EventEmitter, OnInit } from '@angular/core';
import { TopUpHistoryComponent } from "../../pages/top-up-history/top-up-history.component";
import { CustomerRechargeComponent } from "../../pages/customer-recharge/customer-recharge.component";
import { AgentRechargeComponent } from "../../pages/agent-recharge/agent-recharge.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mobile-navbar',
  standalone: true,
  templateUrl: './mobile-navbar.component.html',
  styleUrl: './mobile-navbar.component.scss',
  imports: [
    TopUpHistoryComponent,
    CustomerRechargeComponent,
    AgentRechargeComponent,
    CommonModule,
    RouterModule
  ]
})
export class MobileNavbarComponent implements OnInit {
  [x: string]: any;
  activeTab: string = "Summary"
  Top: any;
  onTabClick(tab: string) {
    this.activeTab = tab;
  }

  unreadCount:number=8;
  constructor() {

  }
  ngOnInit(): void {

  }
}
