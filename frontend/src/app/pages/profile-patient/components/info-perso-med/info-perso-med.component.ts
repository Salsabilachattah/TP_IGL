import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, Patient } from '../../../../services/auth.service';
@Component({
  selector: 'app-perso-med',
  imports: [CommonModule],
  templateUrl: './info-perso-med.component.html',
  styleUrls: ['./info-perso-med.component.css'] // Correction de "styleUrl" en "styleUrls"
})
export class InfoPersoMedComponent {
  dataKeys: string[] = [];
  patient: Patient | null = null; // Pour stocker les informations du patient
  show: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Récupérer les informations du patient connecté
    this.authService.getUserInfo().subscribe((user) => {
      if (user && user.role === 'patient') {
        this.patient = user as Patient; // Caster `user` en `Patient`
        this.dataKeys = Object.keys(this.patient).filter(
          (key) => key !== 'created_at' && key !== 'updated_at' && key !== 'role' && key !== 'user' // Exclure les clés non désirées
        );
      } else {
        console.error('L’utilisateur connecté n’est pas un patient.');
      }
    });
  }

  formatKey(key: string): string {
    return key
    .replace(/_/g, ' ') // Remplace les underscores par des espaces
    .replace(/\bnss\b/i, 'Numéro de sécurité sociale'); // Remplace 'nss' par 'Numéro de sécurité sociale' (insensible à la casse)
  }

  delete(): void {
    this.show = false;
  }
}
