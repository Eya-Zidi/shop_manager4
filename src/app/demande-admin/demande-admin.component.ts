import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderDirecteurComponent } from '../header-directeur/header-directeur.component';
import { FooterComponent } from '../footer/footer.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-demande-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderDirecteurComponent, FooterComponent],
  templateUrl: './demande-admin.component.html',
  styleUrls: ['./demande-admin.component.css']
})
export class DemandeAdminComponent {
  id!: string;
  devisList: any[] = [];  // plusieurs devis
  devis: any = {};
  num: string = '';
  reason = '';
  showSecondDiv = false;

  showRejectPopup = false;
  showAcceptPopup = false;

  selectedDevis: any = null; // Pour la popup

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loadAll();
  }

  loadAll() {
    this.http.get<any>('http://localhost/ShopManager3/backend/uploads/get-devis-by-id.php?id=' + this.id)
      .subscribe(response => {
        if (response.success) {
          this.devisList = response.devis;
          this.num = response.num;
        } else {
          console.error('Erreur backend devis:', response.message);
        }
      }, error => {
        console.error('Erreur HTTP devis:', error);
      });
  }

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


  exportPDF(index : number){
    const dev=this.devisList[index];
    console.log('Selected devis:', dev);
    const doc = new jsPDF();

    // 🏷️ Add Title
    doc.setFontSize(18);
    doc.text('Devis'+String(index+1), 14, 20); // x=14, y=20

    // 📋 Table headers
    const head = [[
      'Référence',
    
      'Désignation',
      'Qte',
      'Prix unitaire',
      'Remise',
      'Montant HT',
      'TVA'
    ]];

    //  One row of data
    const data = [[
      String(dev.reference),
      
      String(dev.libelles),
      String(dev.quantity),
      String(dev.p_unitaire),
      String(dev.remise),
      String(dev.p_totale),
      String(dev.TVA)
    ]];

    //  Add table below title
    autoTable(doc, {
      head: head,
      body: data,
      startY: 30, 
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] } // Optional: green header
    });

    //  Save the PDF
    doc.save('devis.pdf');

  }


  confirmAccept() {
    const formData = new FormData();
    formData.append('id', this.selectedDevis.id);


    this.http.post<any>('http://localhost/ShopManager3/backend/uploads/accept-demande.php', formData)
      .subscribe(
        res => {
          const payload = {
            id2: this.id,
            id: this.selectedDevis.id,
            reason: this.reason,
            email: this.devis.email,
            name: this.devis.name,
            selectedDevisId: this.selectedDevis.id
          };

          
        },
        err => {
         
        }
      );
  }
  }


