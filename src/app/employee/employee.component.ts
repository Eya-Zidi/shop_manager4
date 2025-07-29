import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeaderEmployeeComponent} from '../header-employee/header-employee.component';
import { HistoryComponent} from '../history/history.component';
import { FooterEmployeeComponent} from '../footer-employee/footer-employee.component';

@Component({
  selector: 'app-employee',
  standalone: true, 
  imports: [HeaderEmployeeComponent,HistoryComponent,FooterEmployeeComponent],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  logo = 'data:image/jpeg;base64,...';
  
  //  ici tu ajoutes HttpClient dans le constructeur
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost/ShopManager3/backend/uploads/get_session_role.php', {
      withCredentials: true
    }).subscribe((res: any) => {
      if (res.role == null || res.role !== 'employee') {
        this.router.navigate(['../']);
      }
    });
  }
}