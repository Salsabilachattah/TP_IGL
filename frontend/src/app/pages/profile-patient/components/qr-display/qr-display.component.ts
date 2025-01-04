import { Component, Input, OnInit, OnChanges, SimpleChanges  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService,Patient } from '../../../../services/auth.service';

@Component({
  selector: 'app-qr-display',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './qr-display.component.html',
  styleUrls: ['./qr-display.component.css']
})
export class QrDisplayComponent implements OnInit {
  
  downloadQRCode(): void {
    if (this.generatedImageUrl) {
      const link = document.createElement('a');
      link.href = this.generatedImageUrl;
      link.download = 'qr-code.png'; // Nom du fichier téléchargé
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('Aucune image QR à télécharger.');
    }
  }
  
  
  nss!: number; // Déclaration sans initialisation
  generatedImageUrl: string | null = null; // URL du QR code généré

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Récupérer les informations de l'utilisateur connecté
    this.authService.getUserInfo().subscribe((user) => {
      if (user && user.role === 'patient') {
        const patient = user as Patient; // Caster `user` en `Patient`
        this.nss = patient.nss; // Récupérer le NSS
        this.generateQRCode(); // Générer le QR code avec le NSS récupéré
      } else {
        console.error('L’utilisateur connecté n’est pas un patient ou les informations sont invalides.');
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nss']) {
      this.generateQRCode();
    }
  }

  generateQRCode(): void {
    if (this.nss != null) {
      const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';
      this.generatedImageUrl = `${baseUrl}?size=150x150&data=${encodeURIComponent(this.nss.toString())}`;

      console.log('Generated QR Code URL:', this.generatedImageUrl); // Afficher l'URL générée
    } else {
      console.error('Le NSS est invalide ou non défini.'); // Message d'erreur
      this.generatedImageUrl = null; // Réinitialiser l'URL si le NSS n'est pas valide
    }
  }
}