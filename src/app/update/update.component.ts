import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DevisService } from '../services/devis.service';
import { DemandeService } from '../services/demande.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [DevisService, DemandeService],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  devisForm: any = {
    name: '',
    lastName: '',
    employeeId: '',
    tel: '',
    email: '',
    requestDate: '',
    requestNumber: '',
    from: '',
    to: '',
    description: '',
    requiredDate: '',
    estimatedCost: '',
    justification: '',

    company: '',
    pieceNumber: '',
    pieceName: '',
    quantity: '',
    unitPrice: '',
    guarantees: '',
    paymentMethod: ''
  };

   showPopup = false;
  reason = '';
  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private devisService: DevisService,
    private demandeService: DemandeService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    console.log('ID récupéré depuis l’URL:', this.id);
    if (this.id) {
      this.loadExistingData2(this.id);
    }
  }

  loadExistingData2(id: string): void {
    this.http.get<any>('http://localhost/ShopManager3/backend/uploads/get-devis-by-id.php?id=' + id)
      .subscribe(response => {
        if (response.success) {
          const d = response.devis;
          this.devisForm = {
            name: d.name,
            lastName: d.lastName,
            employeeId: d.employeeId,
            tel: d.tel,
            email: d.email,
            requestDate: d.requestDate,
            requestNumber: d.requestNumber,
            from: d.from_location,
            to: d.to_location,
            description: d.description,
            requiredDate: d.requiredDate,
            estimatedCost: d.estimatedCost,
            justification: d.justification,

            company: d.company,
            pieceNumber: d.piece_number,
            pieceName: d.piece_name,
            quantity: d.quantity,
            unitPrice: d.unit_price, 
            guarantees: d.guarantees,
            paymentMethod: d.payment_method 
          };
        }
      }, error => {
        console.error("Erreur lors du chargement du devis :", error);
      });
  }

  

  UpdateDemande(): void {
    const formData = new FormData();
    formData.append('id', this.id); 

    formData.append('name', this.devisForm.name);
    formData.append('lastName', this.devisForm.lastName);
    formData.append('employeeId', this.devisForm.employeeId);
    formData.append('tel', this.devisForm.tel);
    formData.append('email', this.devisForm.email);
    formData.append('requestDate', this.devisForm.requestDate);
    formData.append('requestNumber', this.devisForm.requestNumber);
    formData.append('from', this.devisForm.from);
    formData.append('to', this.devisForm.to);
    formData.append('description', this.devisForm.description);
    formData.append('requiredDate', this.devisForm.requiredDate);
    formData.append('estimatedCost', this.devisForm.estimatedCost);
    formData.append('justification', this.devisForm.justification);

    formData.append('company', this.devisForm.company);
    formData.append('piece_number', this.devisForm.pieceNumber);
    formData.append('piece_name', this.devisForm.pieceName);
    formData.append('quantity', this.devisForm.quantity);
    formData.append('unit_price', this.devisForm.unitPrice);
    formData.append('guarantees', this.devisForm.guarantees);
    formData.append('payment_method', this.devisForm.paymentMethod);

    this.http.post<any>('http://localhost/ShopManager3/backend/uploads/update-demande.php', formData)
      .subscribe(
        (res) => {
          alert(res.message || 'Demande mise à jour avec succès.');
        },
        (err) => {
          alert('Erreur lors de la mise à jour de la demande : ' + (err.error?.message || 'Erreur inconnue'));
        }
      );
  }

  openPopup(event: Event) {
    event.preventDefault(); 
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  confirmUpdate() {
  console.log('>> Fonction confirmUpdate appelée');

  
  const formData = new FormData();
  formData.append('id', this.id); 
  formData.append('name', this.devisForm.name);
  formData.append('lastName', this.devisForm.lastName);
  formData.append('employeeId', this.devisForm.employeeId);
  formData.append('tel', this.devisForm.tel);
  formData.append('email', this.devisForm.email);
  formData.append('requestDate', this.devisForm.requestDate);
  formData.append('requestNumber', this.devisForm.requestNumber);
  formData.append('from', this.devisForm.from);
  formData.append('to', this.devisForm.to);
  formData.append('description', this.devisForm.description);
  formData.append('requiredDate', this.devisForm.requiredDate);
  formData.append('estimatedCost', this.devisForm.estimatedCost);
  formData.append('justification', this.devisForm.justification);
  formData.append('company', this.devisForm.company);
  formData.append('piece_number', this.devisForm.pieceNumber);
  formData.append('piece_name', this.devisForm.pieceName);
  formData.append('quantity', this.devisForm.quantity);
  formData.append('unit_price', this.devisForm.unitPrice);
  formData.append('guarantees', this.devisForm.guarantees);
  formData.append('payment_method', this.devisForm.paymentMethod);

  this.http.post<any>('http://localhost/ShopManager3/backend/uploads/update-demande.php', formData)
    .subscribe(
      (res) => {
        console.log('Demande mise à jour avec succès.');

        // ✅ 2. Après mise à jour, on envoie l'email avec la raison de modification
        const payload = {
          id: this.id,
          reason: this.reason,
          email: this.devisForm.email, // ou n'importe quel champ utile pour l'email
          name: this.devisForm.name
        };

        this.http.post('http://localhost/ShopManager3/backend/uploads/update-mail.php', payload)
          .subscribe(
            response => {
              alert('Demande modifiée et email envoyé avec succès.');
              this.showPopup = false;
              this.reason = '';
            },
            error => {
              alert('Demande mise à jour, mais erreur lors de l\'envoi de l\'email.');
              console.error('Erreur email :', error);
            }
          );
      },
      (err) => {
        alert('Erreur lors de la mise à jour de la demande : ' + (err.error?.message || 'Erreur inconnue'));
      }
    );
    this.showPopup = false;
}


  
}
