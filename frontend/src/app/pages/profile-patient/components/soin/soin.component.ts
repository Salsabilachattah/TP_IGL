import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoinButtonComponent } from '../soin-button/soin-button.component';
import { PatientService } from '../../../../services/patient.service';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-soin',
  imports:[CommonModule ,  SoinButtonComponent],
  templateUrl: './soin.component.html',
  styleUrls: ['./soin.component.css'],
})
export class SoinComponent {
  soins: any[] = []; // Liste des soins récupérés
  nss: number | null = null; // NSS du patient connecté

  constructor(private patientService: PatientService, private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeNss();
  }

  private initializeNss(): void {
    this.nss = this.authService.getNss();
    if (this.nss) {
      this.fetchSoins();
    } else {
      console.error('NSS introuvable pour le patient connecté.');
    }
  }

  fetchSoins(): void {
    if (this.nss === null) {
      console.error('NSS non disponible. Impossible de récupérer les soins.');
      return;
    }

    this.patientService.getAllSoins(this.nss).subscribe({
      next: (data) => {
        console.log('Soins récupérés :', data);
        this.soins = data.map((soin) => ({
          date: soin.created_at, // Récupérer la date
          observation: soin.observation, // Récupérer l'observation
          show: false, // Ajouter une propriété `show` pour la gestion de l'affichage
        }));
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des soins :', err);
      },
    });
  }

  // Méthode pour afficher ou masquer les détails d'un soin
  displaySoin(index: number): void {
    this.soins[index].show = !this.soins[index].show;
  }

  hideSoin(index: number): void {
    this.soins[index].show = false;
  }
}