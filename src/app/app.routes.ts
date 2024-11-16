import { Routes } from '@angular/router';
import { AgentRechargeComponent } from './pages/agent-recharge/agent-recharge.component';
import { HomeComponent } from './pages/home/home.component';
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods.component';
import { BrilliantLoginComponent } from './pages/brilliant-login/brilliant-login.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { authenticationGuard } from './core/authentication/guards/authentication.guard';
import { BackFromPaymentComponent } from './pages/back-from-payment/back-from-payment.component';
import { TopUpHistoryComponent } from './pages/top-up-history/top-up-history.component';
import { CustomerRechargeComponent } from './pages/customer-recharge/customer-recharge.component';
import { AgentRechargeHistoryComponent } from './pages/agent-recharge-history/agent-recharge-history.component';
import { AgentSummaryComponent } from './pages/agent-summary/agent-summary.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { AgentRegistrationComponent } from './pages/agent-registration/agent-registration.component';
import { PaymentMethodsRegComponent } from './pages/payment-methods-reg/payment-methods-reg.component';
import { BackFromRegistrationComponent } from './pages/back-from-registration/back-from-registration.component';
import { SubAgentRegistrationComponent } from './pages/sub-agent-registration/sub-agent-registration.component';
import { BackFromPaymentRegistrationComponent } from './pages/back-from-payment-registration/back-from-payment-registration.component';
import { AgentLocatorComponent } from './pages/agent-locator/agent-locator.component';
import { NoticeBoardComponent } from './pages/notice-board/notice-board.component';
import { NoticeBoardDetailsComponent } from './pages/notice-board-details/notice-board-details.component';
import { TestComponent } from './pages/test/test.component';

export const routes: Routes = [
    // { 
    //     path: '', component: ContentLayoutComponent
    //     , loadChildren: () => import('./layout/content-layout/content-layout.route').then((m) => m.contentLayoutRoute)
    //     , canActivate:[authenticationGuard] 
    // },
     { path: 'home', component: HomeComponent, title:'Home' },
    //{ path: 'sub-agent-registration', component: SubAgentRegistrationComponent },
    { path: 'brilliant-login/:token/:phone-number', component: BrilliantLoginComponent, title:'Brilliant-Login' },
    { path: 'brilliant-login/:token/:phone-number/:encodedUrl', component: BrilliantLoginComponent, title:'Brilliant-Login' },
    { path: 'brilliant-login', component: BrilliantLoginComponent, title:'Brilliant-Login' },
    { path: 'terms-condition/:phonenumber', component: TermsAndConditionsComponent, title:'Terms&Condition'},
    { path: 'terms-condition/:phonenumber/:encodedUrl', component: TermsAndConditionsComponent, title:'Terms&Condition'},
    { path: 'agent-registration/:phonenumber', component: AgentRegistrationComponent, title:'Agent Registration'},
    { path: 'payment-method-reg/:phonenumber', component: PaymentMethodsRegComponent, title:'Payment Method'},
    { path: 'back-from-registration/:status/:message', component: BackFromRegistrationComponent, title: "Back From Registration"},
    { path: 'back-from-payment-registration/:status/:message/:phoneNumber', component: BackFromPaymentRegistrationComponent, title: "Back From Payment"},
    { path: 'back-from-payment-registration/:status/:message', component: BackFromPaymentRegistrationComponent, title: "Back From Payment"},
    { path: 'agent-locator', component: AgentLocatorComponent, title: "Agent Locator"},
    { path: '', component: TestComponent, title: "CustomerRecharge"},
    { path: 'notice-board', component: NoticeBoardComponent, title: "Notice Board"},
    { path: 'notice-board-details', component: NoticeBoardDetailsComponent, title: "Notice Board Details"}
];
