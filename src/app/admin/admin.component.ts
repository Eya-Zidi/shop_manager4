import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeaderAdminComponent} from '../header-admin/header-admin.component';
import { MainAdminComponent} from '../main-admin/main-admin.component';
import { FooterEmployeeComponent} from '../footer-employee/footer-employee.component';


@Component({
  selector: 'app-admin',
  standalone: true, // si tu utilises Angular standalone
  imports: [HeaderAdminComponent,MainAdminComponent,FooterEmployeeComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  
  // ✅ ici tu ajoutes HttpClient dans le constructeur
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost/ShopManager3/backend/uploads/get_session_role.php', {
      withCredentials: true
    }).subscribe((res: any) => {
      if (res.role == null || res.role !== 'admin') {
        this.router.navigate(['../']);
      }
    });
  }
}
