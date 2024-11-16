import { Routes } from "@angular/router";
import { AgentRechargeComponent } from "../../pages/agent-recharge/agent-recharge.component";
import { PaymentMethodsComponent } from "../../pages/payment-methods/payment-methods.component";
import { CustomerRechargeComponent } from "../../pages/customer-recharge/customer-recharge.component";
import { TopUpHistoryComponent } from "../../pages/top-up-history/top-up-history.component";
import { authenticationGuard } from "../../core/authentication/guards/authentication.guard";
import { MobileNavbarComponent } from "../mobile-navbar/mobile-navbar.component";
import { AgentSummaryComponent } from "../../pages/agent-summary/agent-summary.component";
import { AgentRechargeHistoryComponent } from "../../pages/agent-recharge-history/agent-recharge-history.component";
import { TermsAndConditionsComponent } from "../../pages/terms-and-conditions/terms-and-conditions.component";
import { BackFromPaymentComponent } from "../../pages/back-from-payment/back-from-payment.component";
import { PaymentMethodsRegComponent } from "../../pages/payment-methods-reg/payment-methods-reg.component";
import { SubAgentRegistrationComponent } from "../../pages/sub-agent-registration/sub-agent-registration.component";
import { SubAgentListComponent } from "../../pages/sub-agent-list/sub-agent-list.component";


export const contentLayoutRoute: Routes = [
    // { path: '', component: AgentSummaryComponent, title: "Agent Summary", canActivate: [authenticationGuard] },
    // { path: '', component: CustomerRechargeComponent, title: "Topup", canActivate: [authenticationGuard] },
    { path: '', redirectTo: '/customer-recharge', pathMatch: 'full'},
    { path: 'agent-recharge', component: AgentRechargeComponent, title: "Recharge", canActivate: [authenticationGuard] },
    { path: 'customer-recharge', component: CustomerRechargeComponent, title: "Topup", canActivate: [authenticationGuard] },
    { path: 'payment-method/:amount', component: PaymentMethodsComponent, title: "Payment Method", canActivate: [authenticationGuard] },
    { path: 'top-up-history', component: TopUpHistoryComponent, title: "Topup History", canActivate: [authenticationGuard] },
    { path: 'agent-summary', component: AgentSummaryComponent, title: "Summary", canActivate: [authenticationGuard] },
    { path: 'agent-recharge-history', component: AgentRechargeHistoryComponent, title: "Recharge History", canActivate: [authenticationGuard] },
    { path: 'back-from-payment/:status/:message', component: BackFromPaymentComponent, title: "Back From Payment", canActivate: [authenticationGuard] },
    //{ path: 'sub-agent-registration', component: SubAgentRegistrationComponent, title: "Sub-agent Registration", canActivate: [authenticationGuard] },
    //{ path: 'sub-agent-list', component: SubAgentListComponent, title: "Sub-Agent List", canActivate: [authenticationGuard] }
    
]; 