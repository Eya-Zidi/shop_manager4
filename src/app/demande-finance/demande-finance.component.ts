import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderEmployeeComponent } from '../header-employee/header-employee.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-demande-finance',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,HeaderEmployeeComponent,FooterComponent ],
  templateUrl: './demande-finance.component.html',
  styleUrls: ['./demande-finance.component.css']
})
export class DemandeFinanceComponent {
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
    this.http.get<any>('http://localhost/ShopManager3/backend/uploads/get-devis-by-id.php?id=' + this.id)
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

  // w REJECT POPUP
  openPopup(event: Event) {
    event.preventDefault();
    this.showRejectPopup = true;
  }
  openAcceptPopup(event: Event) {
    event.preventDefault();
    this.showAcceptPopup = true;
  }

  closePopup() {
    this.showRejectPopup = false;
    this.showAcceptPopup = false;
  }

  confirmReject() {
    const formData = new FormData();
    formData.append('id', this.id);

    this.http.post<any>('http://localhost/ShopManager3/backend/uploads/reject-demande.php', formData)
      .subscribe(
        res => {
          const payload = {
            id: this.id,
            reason: this.reason,
            email: this.devis.email,
            name: this.devis.name
          };

          this.http.post('http://localhost/ShopManager3/backend/uploads/reject-mail.php', payload)
            .subscribe(
              response => {
                alert('Demande rejetée et email envoyé avec succès.');
                this.showRejectPopup = false;
                this.reason = '';
              },
              error => {
                alert('Demande rejetée, mais erreur lors de l\'envoi de l\'email.');
              }
            );
        },
        err => {
          alert('Erreur lors de la mise à jour : ' + (err.error?.message || 'Erreur inconnue'));
        }
      );
  }

  confirmAccept() {
    const formData = new FormData();
    formData.append('id', this.id);

    this.http.post<any>('http://localhost/ShopManager3/backend/uploads/accept-demande.php', formData)
      .subscribe(
        res => {
          const payload = {
            id: this.id,
            reason: this.reason,
            email: this.devis.email,
            name: this.devis.name
          };

          this.http.post('http://localhost/ShopManager3/backend/uploads/accept-mail.php', payload)
            .subscribe(response => {
              alert('Demande acceptée et email envoyé.');
              this.showAcceptPopup = false;
              this.reason = '';
            }, error => {
              alert('Erreur lors de l\'acceptation ou de l\'envoi de l\'email.');
            });
        },
        err => {
          alert('Erreur lors de la mise à jour : ' + (err.error?.message || 'Erreur inconnue'));
        }
      );
  }
}
