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

  applyFilters() {
    const selectedCategories: string[] = [];
    if ((<HTMLInputElement>document.getElementById('cat1')).checked) selectedCategories.push("pièce birotique");
    if ((<HTMLInputElement>document.getElementById('cat2')).checked) selectedCategories.push("Accessoire et Connectivité");
    if ((<HTMLInputElement>document.getElementById('cat3')).checked) selectedCategories.push("pièce industrielle");
    if ((<HTMLInputElement>document.getElementById('cat4')).checked) selectedCategories.push("pièce élètronique");

    // Situation filter
    this.situationFilter = 'all';
    if ((<HTMLInputElement>document.getElementById('option1')).checked) this.situationFilter = 'pending';
    else if ((<HTMLInputElement>document.getElementById('option2')).checked) this.situationFilter = 'commande';
    else if ((<HTMLInputElement>document.getElementById('option3')).checked) this.situationFilter = 'stock';
    else if ((<HTMLInputElement>document.getElementById('option4')).checked) this.situationFilter = 'Rejected';

    // Amount filter
    let amountFilter = 'all';
    if ((<HTMLInputElement>document.getElementById('op2')).checked) amountFilter = 'above5000';
    else if ((<HTMLInputElement>document.getElementById('op3')).checked) amountFilter = 'below5000';

    this.links = this.allDevis.filter((item: any) => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(item.categorie);
      const situationMatch = (this.situationFilter === 'all') || (item.situation === this.situationFilter);

      const cost = parseFloat(item.estimatedCost || "0");
      let amountMatch = true;
      if (amountFilter === 'above5000') amountMatch = cost > 5000;
      else if (amountFilter === 'below5000') amountMatch = cost < 5000;

      return categoryMatch && situationMatch && amountMatch;
    });
  }

  getColorClass(situation: string): string {
    if (situation === 'rejected' || situation === 'rejectedDirecteur') return 'cell-rejected';
    if (situation === 'pending') return 'cell-pending';
    if (situation === 'commande') return 'cell-commande';
    return '';
  }
}
