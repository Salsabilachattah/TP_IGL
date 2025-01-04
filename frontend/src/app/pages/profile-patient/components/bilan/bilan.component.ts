import { CommonModule } from '@angular/common';
import { BilanButtonComponent } from '../bilan-button/bilan-button.component';
import { BouttonResultatComponent } from '../boutton-resultat/boutton-resultat.component';
import { Component, OnInit } from '@angular/core';
import { BilanService } from '../../../../services/bilan.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-bilan',
  standalone: true,
  imports: [CommonModule, BouttonResultatComponent, BilanButtonComponent],
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.css'],
})
export class BilanComponent implements OnInit {
  consultations: any[] = [];
  nss: number | null = null; // Will be set dynamically
  valide = true; // Or false depending on the requirement

  constructor(private bilanService: BilanService, private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeNss();
  }

  private initializeNss(): void {
    this.nss = this.authService.getNss();
    if (this.nss) {
      this.fetchBilans();
    } else {
      console.error('Failed to fetch NSS for the current patient.');
    }
  }

  fetchBilans(): void {
    if (this.nss === null) {
      console.error('NSS non disponible. Impossible de récupérer les bilans.');
      return;
    }
  
    const nssString = this.nss.toString(); // Convertir nss en chaîne de caractères
  
    // Tentative de récupération avec "valide" à true
    this.bilanService.getAllBilans(nssString, true).subscribe({
      next: (data) => {
        console.log('Données récupérées :', data); // Ajoutez ce log
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
  // Méthode pour récupérer les bilans non valides
  fetchBilansNonValides(nss: string): void {
    this.bilanService.getAllBilans(nss, false).subscribe({
      next: (data) => {
        console.log('Données récupérées :', data); // Ajoutez ce log
      
        this.consultations = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des bilans non valides :', err);
      },
    });
  }
  
  

  // Methods to toggle display for prescription, état, résultat
  displayPrescription(index: number): void {
    this.consultations[index].show = !this.consultations[index].show;
  }


  displayResultat(index: number): void {
    this.consultations[index].show3 = !this.consultations[index].show3;
  }
}
