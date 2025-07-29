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

        this.allDevis = response.devis.filter((item: any) => this.isDateExpired(item.requiredDate));
        this.links = [...this.allDevis];
      } else {
        console.error('Erreur backend:', response.message);
      }
    }, error => {
      console.error('Erreur HTTP:', error);
    });
  }

  confirmCommande(item: any) {
  const formData = new FormData();
  formData.append('id', item.id);

  this.http.post<any>('http://localhost/ShopManager3/backend/uploads/confirmStock.php', formData)
    .subscribe(response => {
      if(response.success) {
        alert('Your order has been received and is now in stock');
        this.loadAll(); // recharge la liste pour voir le changement
      } else {
        alert('Echec' + response.message);
      }
    }, error => {
      alert('Erreur HTTP : ' + error.message);
    });
}

 

  
  applyFilters() {
    const selectedCategories: string[] = [];
    if ((<HTMLInputElement>document.getElementById('cat1')).checked) selectedCategories.push("Pièce birotique");
    if ((<HTMLInputElement>document.getElementById('cat2')).checked) selectedCategories.push("Accessoire et Connectivité");
    if ((<HTMLInputElement>document.getElementById('cat3')).checked) selectedCategories.push("Pièce industrielle");
    if ((<HTMLInputElement>document.getElementById('cat4')).checked) selectedCategories.push("Pièce électronique");

    let amountFilter = 'all';
    if ((<HTMLInputElement>document.getElementById('op2')).checked) amountFilter = 'above5000';
    else if ((<HTMLInputElement>document.getElementById('op3')).checked) amountFilter = 'below5000';

    this.links = this.allDevis.filter((item: any) => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(item.categorie);
      const cost = parseFloat(item.estimatedCost || "0");

      let amountMatch = true;
      if (amountFilter === 'above5000') amountMatch = cost > 5000;
      else if (amountFilter === 'below5000') amountMatch = cost < 5000;

      const dateExpired = this.isDateExpired(item.requiredDate);

      return categoryMatch && amountMatch && dateExpired;
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
