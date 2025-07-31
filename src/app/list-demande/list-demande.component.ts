import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderEmployeeComponent } from '../header-employee/header-employee.component';
import { FooterEmployeeComponent } from '../footer-employee/footer-employee.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-demande',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderEmployeeComponent, FooterEmployeeComponent],
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.css']
})
export class ListDemandeComponent implements OnInit {
  links: any[] = [];
  allDevis: any[] = [];
  @Input() data: string = '';
  showPopup = false;

  

  constructor(private http: HttpClient) {}

  ngOnInit(): void {                  
    this.loadAll();
  }

  loadAll() {
    this.http.get<any>('http://localhost/ShopManager3/backend/uploads/history.php?id=' + this.data).subscribe(response => {
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

  

  

  getColorClass(situation: string): string {
    if (situation === 'Responsable reject' || situation === 'Directeur reject') return 'cell-rejected';
    if (situation === 'pending') return 'cell-pending';
    if (situation === 'Votre Demande Accepter') return 'cell-commande';
    return '';
  }
}
