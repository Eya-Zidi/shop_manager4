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

  demandeForm: any = {
    reference: '',
    libelles: '',
    remise: '',
    tva: '',
    p_totale: '',
    p_unitaire: '',
    categorie: '',
    quantity: '',
    
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
          this.demandeForm = {
            reference: d.reference,
            libelles: d.libelles,
            remise: d.remise,
            tva: d.tva,
            p_totale: d.p_totale,
             p_unitaire: d. p_unitaire,
            categorie: d.categorie,
            quantity: d.quantity,
            
          };
        }
      }, error => {
        console.error("Erreur lors du chargement du devis :", error);
      });
  }

  

  UpdateDemande(): void {
    const formData = new FormData();
    formData.append('id', this.id); 

    formData.append('reference', this.demandeForm.reference);
    formData.append('libelles', this.demandeForm.libelles);
    formData.append('remise', this.demandeForm.remise);
    formData.append('tva', this.demandeForm.tva);
    formData.append('p_totale', this.demandeForm.p_totale);
    formData.append(' p_unitaire', this.demandeForm. p_unitaire);
    formData.append('categorie', this.demandeForm.categorie);
    formData.append('quantity', this.demandeForm.quantity);

   

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

}