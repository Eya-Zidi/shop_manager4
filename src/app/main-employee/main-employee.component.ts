import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DemandeService } from '../services/demande.service';

@Component({
  selector: 'app-main-employee',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [DemandeService],
  templateUrl: './main-employee.component.html',
  styleUrls: ['./main-employee.component.css']
})
export class MainEmployeeComponent {

  showPopup = false;
  showPopup2 = false;

  demandeForm: any = {
    requestDate: '',
    requestNumber: '',
    from: '',
    to: '',
    description: '',
    requiredDate: '',
    estimatedCost: '',
    justification: '',
    
    company: '',
    categorie: '',
    pieceNumber: '',
    pieceName: '',
    quantity: '',
    unitPrice: '',
    guarantees: '',
    paymentMethod: '',
    quote: false,

    company2: '',
    categorie2: '',
    pieceNumber2: '',
    pieceName2: '',
    quantity2: '',
    unitPrice2: '',
    guarantees2: '',
    paymentMethod2: '',
    quote2: false,

    company3: '',
    categorie3: '',
    pieceNumber3: '',
    pieceName3: '',
    quantity3: '',
    unitPrice3: '',
    guarantees3: '',
    paymentMethod3: ''
  };

  constructor(private demandeService: DemandeService, private http: HttpClient) {}

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  togglePopup2() {
    this.showPopup2 = !this.showPopup2;
  }


  closePopup() {
    this.showPopup = false;
    this.demandeForm.quote = false; // décocher le checkbox aussi si popup fermé
  }

  submitDemandeDevis(): void {
    const formData = new FormData();
    for (const key in this.demandeForm) {
      if (this.demandeForm.hasOwnProperty(key)) {
        formData.append(key, this.demandeForm[key]);
      }
    }

    this.demandeService.addDemande(formData).subscribe(
      (res) => alert(res.message || 'Request and quote submitted successfully.'),
      (err) => alert('Error submitting request and quote.')
    );
  }

  confirmadd() {
    // Logique pour confirmer l'ajout, appeler l'API et envoyer mail (comme tu avais)
    const formData = new FormData();

    for (const key in this.demandeForm) {
      if (this.demandeForm.hasOwnProperty(key)) {
        formData.append(key, this.demandeForm[key]);
      }
    }

  }
}
