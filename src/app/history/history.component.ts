import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderEmployeeComponent } from '../header-employee/header-employee.component';
import { FooterEmployeeComponent } from '../footer-employee/footer-employee.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterEmployeeComponent, HeaderEmployeeComponent],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  links: any[] = [];
  allDevis: any[] = [];
  situationFilter: string = 'all'; // 👈 Pour contrôler la situation sélectionnée

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.http.get<any>('http://localhost/ShopManager3/backend/uploads/history.php').subscribe(response => {
      if (response.success) {
        this.allDevis = response.devis;
        this.links = [...this.allDevis];
      } else {
        console.error('Erreur backend:', response.message);
      }
    }, error => {
      console.error('Erreur HTTP:', error);
    });
  }

  UpdateRequest(item: any) {
    console.log('Update clicked for:', item);
  }

 

  getColorClass(situation: string): string {
    if (situation === 'rejected' || situation === 'rejectedDirecteur') return 'cell-rejected';
    if (situation === 'pending') return 'cell-pending';
    if (situation === 'commande') return 'cell-commande';
    return '';
  }
}
