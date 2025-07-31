import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderDirecteurComponent} from '../header-directeur/header-directeur.component';
import { FooterEmployeeComponent} from '../footer-employee/footer-employee.component';

@Component({
  selector: 'app-exemple',
  standalone: true,
  imports: [CommonModule, RouterModule,HeaderDirecteurComponent,FooterEmployeeComponent],
  templateUrl: './exemple.component.html',
  styleUrls: ['./exemple.component.css']
})
export class ExempleComponent implements OnInit {
  links: any[] = [];
  allDevis: any[] = [];
  situationFilter: string = 'all'; // 👈 Pour contrôler la situation sélectionnée
  @Input() data: string = '';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.http.get<any>('http://localhost/ShopManager3/backend/uploads/List-demande.php?id='+this.data).subscribe(response => {
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
    if (situation === 'Responsable reject' ) return 'cell-rejected';
    if (situation === 'Responsable Accept') return 'cell-pending';
    if (situation === 'Votre Demande Accepter') return 'cell-commande';
    return '';
  }
}
