import { Routes } from '@angular/router';
import { RequestComponent } from './request/request.component';
import { HeaderComponent} from './header/header.component';
import { AdminComponent} from './admin/admin.component';
import { EmployeeComponent } from './employee/employee.component';
import { FooterComponent } from './footer/footer.component';
import {DemandeAdminComponent } from './demande-admin/demande-admin.component';
import { AcceptComponent } from './accept/accept.component';
import { RequestRejectComponent } from './request-reject/request-reject.component'
import { HistoryComponent } from './history/history.component';

import { MainEmployeeComponent } from './main-employee/main-employee.component';
import { CommandeComponent } from './commande/commande.component';
import { ExempleComponent } from './exemple/exemple.component';
import { TesterComponent } from './tester/tester.component';
import { StockComponent } from './stock/stock.component';

export const routes: Routes = [
    { path: '', component: HeaderComponent},
   { path: 'Sign', component: RequestComponent },
   { path: 'admin', component: AdminComponent },
   { path: 'finance', component: CommandeComponent },
   { path: 'employee/:id', component: EmployeeComponent },
   { path: 'contact', component: FooterComponent },
   { path: 'accept', component: AcceptComponent },
   { path: 'history', component: HistoryComponent },
   { path: 'historique', component: RequestRejectComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'confirm', component: TesterComponent },
    { path: 'Stock', component: StockComponent },


   { path: 'liste', component: ExempleComponent },

   { path: 'request_reject/:id', component: RequestRejectComponent },

   {path: 'creat',component: MainEmployeeComponent},
   { path: 'demande/:id', component: DemandeAdminComponent },
];
