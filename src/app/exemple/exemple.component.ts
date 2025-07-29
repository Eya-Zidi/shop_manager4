import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-exemple',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './exemple.component.html',
  styleUrl: './exemple.component.css'
})
export class ExempleComponent {
   id!: string;
  devis: any = {};  

  

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loadAll();
  }

  loadAll() {
    this.http.get<any>('http://localhost/ShopManager3/backend/uploads/get-devis.php?id=' + this.id)
      .subscribe(response => {
        if (response.success) {
          this.devis = response.devis; 
        } else {
          console.error('Erreur backend devis:', response.message);
        }
      }, error => {
        console.error('Erreur HTTP devis:', error);
      });
  }

}
