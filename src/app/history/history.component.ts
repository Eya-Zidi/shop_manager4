import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderEmployeeComponent } from '../header-employee/header-employee.component';
import { FooterEmployeeComponent } from '../footer-employee/footer-employee.component';

@Component({
  selector: 'app-history',
  standalone: true,  // ajoute ça si tu veux utiliser imports dans @Component
  imports: [CommonModule, RouterModule, FooterEmployeeComponent, HeaderEmployeeComponent],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']  // corrigé styleUrl → styleUrls
})
export class HistoryComponent implements OnInit {
  links: any[] = [];
  allDevis: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.http.get<any>('http://localhost/ShopManager3/backend/uploads/history.php').subscribe(response => {
      if (response.success) {
        this.allDevis = response.devis;

        console.log('Catégories dans la bd');
        this.allDevis.forEach((item: any) => console.log(item.categorie));

        this.links = [...this.allDevis];
      } else {
        console.error('Erreur backend:', response.message);
      }
    }, error => {
      console.error('Erreur HTTP:', error);
    });
  }

  applyFilters() {
    const selectedCategories: string[] = [];
    if ((<HTMLInputElement>document.getElementById('cat1')).checked) selectedCategories.push("pièce birotique");
    if ((<HTMLInputElement>document.getElementById('cat2')).checked) selectedCategories.push("Accessoire et Connectivité");
    if ((<HTMLInputElement>document.getElementById('cat3')).checked) selectedCategories.push("pièce industrielle");
    if ((<HTMLInputElement>document.getElementById('cat4')).checked) selectedCategories.push("pièce élètronique");

    let amountFilter = 'all';
    if ((<HTMLInputElement>document.getElementById('op2')).checked) amountFilter = 'above5000';
    else if ((<HTMLInputElement>document.getElementById('op3')).checked) amountFilter = 'below5000';

    this.links = this.allDevis.filter((item: any) => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(item.categorie);
      const cost = parseFloat(item.estimatedCost || "0");
      let amountMatch = true;

      if (amountFilter === 'above5000') amountMatch = cost > 5000;
      else if (amountFilter === 'below5000') amountMatch = cost < 5000;

      return categoryMatch && amountMatch;
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
