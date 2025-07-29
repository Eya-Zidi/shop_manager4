import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderEmployeeComponent } from '../header-employee/header-employee.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-stock',
  imports: [RouterModule,CommonModule,HeaderEmployeeComponent ,FooterComponent ],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {
  links: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.http.get<any>('http://localhost/ShopManager3/backend/uploads/stock.php').subscribe(response => {
      if (response.success) {
        this.links = [];

        
        this.links = this.links.concat(
          response.devis.map((item: any) => ({
            piece_name: item.piece_name,
            id: item.id,
            type: 'devis'
          }))
        );
        
      } else {
        console.error('Erreur backend:', response.message);
      }
    }, error => {
      console.error('Erreur HTTP:', error);
    });
  }
}
