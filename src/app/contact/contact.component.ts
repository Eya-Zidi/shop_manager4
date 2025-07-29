import { Component } from '@angular/core';
import { HeaderEmployeeComponent} from '../header-employee/header-employee.component';
import { AdminComponent} from '../admin/admin.component';
import { FooterEmployeeComponent} from '../footer-employee/footer-employee.component';

@Component({
  selector: 'app-contact',
  imports: [HeaderEmployeeComponent,AdminComponent,FooterEmployeeComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
