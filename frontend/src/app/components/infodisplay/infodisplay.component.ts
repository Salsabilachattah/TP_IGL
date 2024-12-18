import { Component } from '@angular/core';

@Component({
  selector: 'app-infodisplay',
  imports: [],
  templateUrl: './infodisplay.component.html',
  styleUrl: './infodisplay.component.css'
})
export class InfodisplayComponent {
  userData = {
    nss: '123456789',
    nom: 'Dupont',
    prenom: 'Jean',
    dateNaissance: '01/01/1980',
    adresse: '123 Rue de Paris, 75000 Paris',
    telephone: '0123456789',
    mutuelle: 'Mutuelle Santé',
    medecinTraitant: 'Dr. Martin',
    personneContacter: 'Marie Dupont',
    codeQR: 'Lien ou image du QR code',
  };

}
