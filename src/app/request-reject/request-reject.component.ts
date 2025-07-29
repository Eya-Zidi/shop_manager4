import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-request-reject',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './request-reject.component.html',
  styleUrl: './request-reject.component.css'
})
export class RequestRejectComponent {
  logo = 'logo.jpg';
  id!: string;
  devis: any = {};  

  reason = '';
  showRejectPopup = false;
  showAcceptPopup = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loadAll();
  }

  loadAll() {
    this.http.get<any>('http://localhost/ShopManager3/backend/uploads/history-request.php?id=' + this.id)
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
