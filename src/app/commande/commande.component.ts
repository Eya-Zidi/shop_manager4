import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderDirecteurComponent} from '../header-directeur/header-directeur.component';
import { FooterEmployeeComponent} from '../footer-employee/footer-employee.component';
@Component({
  selector: 'app-history',
  imports: [CommonModule, RouterModule,FooterEmployeeComponent, HeaderDirecteurComponent],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent {
  links: any[] = [];
  allDevis: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAll();
  }

  
  isDateExpired(dateString: string): boolean {
    const today = new Date();
    const required = new Date(dateString);

    return required > new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  loadAll() {
    this.http.get<any>('http://localhost/ShopManager3/backend/uploads/commande.php').subscribe(response => {
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

  confirmDemande(item: any) {
  const formData = new FormData();
  formData.append('id', item.id);

  this.http.post<any>('http://localhost/ShopManager3/backend/uploads/confirmStock.php', formData)
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


SupprimmerDemande(item: any) {
  const formData = new FormData();
  formData.append('id', item.id);

  this.http.post<any>('http://localhost/ShopManager3/backend/uploads/reject-demande-directeur.php', formData)
    .subscribe(response => {
      if(response.success) {
        alert('Votre demande est annuler');
        this.loadAll(); 
      } else {
        alert('Echec' + response.message);
      }
    }, error => {
      alert('Erreur HTTP : ' + error.message);
    });
}

 

  
 
  getColorClass(situation: string): string {
    if (situation === 'rejected' || situation === 'rejectedDirecteur') {
      return 'cell-rejected';
    } else if (situation === 'pending') {
      return 'cell-pending';
    } else if (situation === 'commande') {
      return 'cell-commande';
    }
    return '';
  }

}
