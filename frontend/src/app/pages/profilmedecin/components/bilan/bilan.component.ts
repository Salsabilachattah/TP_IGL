import { CommonModule } from '@angular/common';
import { BouttonResultatComponent } from '../boutton-resultat/boutton-resultat.component';
import { BilanButtonComponent } from '../bilan-button/bilan-button.component'; 
import { Component, Input, OnInit } from '@angular/core';
import { BilanService } from '../../../../services/bilan.service';

@Component({
  selector: 'app-bilan',
  standalone: true,
  imports: [CommonModule, BouttonResultatComponent, BilanButtonComponent],
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.css'],
})
export class BilanComponent implements OnInit {
  consultations: any[] = [];
  @Input() nss: number | string | null = null;
  valide = true;

  constructor(private bilanService: BilanService) {}

  ngOnInit(): void {
    if (this.nss) {
      console.log('mss récupérées :', this.nss);
      console.log('Valeur de nss :', this.nss, 'Type :', typeof this.nss);

      this.fetchBilans();
    } else {
      console.error('NSS non spécifié. Impossible de récupérer les bilans.');
    }
  }

  fetchBilans(): void {
    if (this.nss === null) {
      console.log('mss récupérées :', this.nss);
       
      console.error('NSS non disponible. Impossible de récupérer les bilans.');
      return;
    }

    const nssString = this.nss.toString().replace(/,/g, '').trim(); // Convertir nss en chaîne de caractères

    // Tentative de récupération avec "valide" à true
    this.bilanService.getAllBilans(nssString, true).subscribe({
      next: (data) => {
        console.log('Données récupérées :', data);
        if (data && data.length > 0) {
          this.consultations = data;
        } else {
          this.fetchBilansNonValides(nssString);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des bilans valides :', err);
        this.fetchBilansNonValides(nssString);
      },
    });
  }

  fetchBilansNonValides(nss: string): void {
    this.bilanService.getAllBilans(nss, false).subscribe({
      next: (data) => {
        console.log('Données récupérées :', data);
        this.consultations = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des bilans non valides :', err);
      },
    });
  }

  hidePrescription(index: number): void {
    this.consultations[index].show = false; // Cache la prescription
}



hideResultat(index: number): void {
    this.consultations[index].show3 = false; // Cache le résultat
}
displayPrescription(index: number): void {
  this.consultations[index].show = !this.consultations[index].show; // Toggle prescription visibility
}

displayResultat(index: number): void {
  this.consultations[index].show3 = !this.consultations[index].show3; // Toggle result visibility
}

}
