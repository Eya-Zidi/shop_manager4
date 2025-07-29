import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeaderEmployeeComponent} from '../header-employee/header-employee.component';
import { MainFinanceComponent} from '../main-finance/main-finance.component';
import { FooterEmployeeComponent} from '../footer-employee/footer-employee.component';

@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [HeaderEmployeeComponent, MainFinanceComponent,FooterEmployeeComponent],
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
