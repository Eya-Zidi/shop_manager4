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
    reference: '',
    libelles: '',
    categorie: '',
    quantity: '',
    p_unitaire: '',
    p_totale: '',
    remise: '',
    tva: '',
    quote: false,

    reference2: '',
    libelles2: '',
    categorie2: '',
    quantity2: '',
    p_unitaire2: '',
    p_totale2: '',
    remise2: '',
    tva2: '',
    quote2: false,

    reference3: '',
    libelles3: '',
    categorie3: '',
    quantity3: '',
    p_unitaire3: '',
    p_totale3: '',
    remise3: '',
    tva3: '',
  
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
    this.demandeForm.quote = false; 
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

    const formData = new FormData();

    for (const key in this.demandeForm) {
      if (this.demandeForm.hasOwnProperty(key)) {
        formData.append(key, this.demandeForm[key]);
      }
    }

  }
}
