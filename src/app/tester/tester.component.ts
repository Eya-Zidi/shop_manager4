import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderAdminComponent} from '../header-admin/header-admin.component';
import { FooterEmployeeComponent} from '../footer-employee/footer-employee.component';

@Component({
  selector: 'app-list-demande',
  standalone: true,
  imports: [CommonModule, RouterModule,HeaderAdminComponent,FooterEmployeeComponent],
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.css']
})
export class TesterComponent implements OnInit {
  links: any[] = [];
  allDevis: any[] = [];
  situationFilter: string = 'all'; // 👈 Pour contrôler la situation sélectionnée
  @Input() data: string = '';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAll();
  }

 loadAll() {
    this.http.get<any>('http://localhost/ShopManager3/backend/uploads/confirm-directeur.php').subscribe(response => {
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



   confirmDemande(item: any) {
    const formData = new FormData();
    formData.append('id', item.id);

    this.http.post<any>('http://localhost/ShopManager3/backend/uploads/etape-finale.php', formData)
      .subscribe(response => {
        if(response.success) {
          alert('votre Demande est Accepter');
          this.loadAll(); 
        } else {
          alert('Echec' + response.message);
        }
      }, error => {
        alert('Erreur HTTP : ' + error.message);
      });
  }



  

  getColorClass(situation: string): string {
    if (situation === 'rejected' || situation === 'rejectedDirecteur') return 'cell-rejected';
    if (situation === 'pending') return 'cell-pending';
    if (situation === 'commande') return 'cell-commande';
    return '';
  }
}
