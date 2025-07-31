import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { HeaderAdminComponent} from '../header-admin/header-admin.component';
@Component({
  selector: 'app-stock',
  imports: [CommonModule, RouterModule, HeaderAdminComponent, FormsModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {
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
    this.http.get<any>('http://localhost/ShopManager3/backend/uploads/stock.php').subscribe(response => {
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
    if (situation === 'rejected' || situation === 'rejectedDirecteur') {
      return 'cell-commande';
    } else if (situation === 'pending') {
      return 'cell-pending';
    } else if (situation === 'commande') {
      return 'cell-commande';
    }
    return '';
  }
}
