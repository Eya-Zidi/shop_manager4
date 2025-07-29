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
import { UpdateComponent } from './update/update.component';
import { ExempleComponent } from './exemple/exemple.component';

export const routes: Routes = [
    { path: '', component: HeaderComponent},
   { path: 'Sign', component: RequestComponent },
   { path: 'admin', component: AdminComponent },
   { path: 'employee', component: EmployeeComponent },
   { path: 'contact', component: FooterComponent },
   { path: 'accept', component: AcceptComponent },
   { path: 'history', component: HistoryComponent },
   { path: 'request_reject/:id', component: RequestRejectComponent },
   {path: 'update/:id',component: UpdateComponent},

   { path: 'demande/:id', component: DemandeAdminComponent },
];
