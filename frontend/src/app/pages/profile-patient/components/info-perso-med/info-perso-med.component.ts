import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perso-med',
  imports: [CommonModule],
  templateUrl: './info-perso-med.component.html',
  styleUrl: './info-perso-med.component.css'
})
export class InfoPersoMedComponent {
/**Numéro de sécurité sociale
Nom
Prénom
Date de naissance
Adresse
Téléphone
Mutuelle
Médecin
traitant
Personne à contacter
Code QR */
itemss: Array<string> = ["Numéro de sécurité sociale",
  "Nom",
"  Prénom",
 " Date de naissance",
 " Adresse",
 " Téléphone",
  "Mutuelle",
 " Médecin traitant",
 " Personne à contacter",
  "Code QR "];

//from the backend
items  : Array<{ [key: string]: any }> =[
  {
Numéro_de_sécurité_sociale: "12365821 21",
Nom : "badaoui ",
Prénom: "3",
date_de_naissance: "16/07/2004",
Adresse : "Dellys Boumerdes",
Téléphone: "0781064433",
Mutuelle: "7",
Médecin_traitant: "Dr Marmouze",
Personne_à_contacter: "bedjghit Djinane",
Code_QR: "102548712014",

  }
]
dataKeys :string[] = Object.keys(this.items[0]);

show:boolean=true;

delete(){
  this.show=false;
}

}
