import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeaderAdminComponent} from '../header-admin/header-admin.component';
import { HistoryComponent} from '../history/history.component';
import { FooterEmployeeComponent} from '../footer-employee/footer-employee.component';
import { CommandeComponent } from "../commande/commande.component";

@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [HeaderAdminComponent, HistoryComponent, FooterEmployeeComponent, CommandeComponent],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.css'
})
export class FinanceComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost/ShopManager3/backend/uploads/get_session_role.php', {
      withCredentials: true
    }).subscribe((res: any) => {
      if (res.role == null || res.role !== 'finance') {
        this.router.navigate(['../']);
      }
    });
  }

}
