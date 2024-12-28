import { Component , EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consultation-button',
  imports: [CommonModule],
  templateUrl: './consultation-button.component.html',
  styleUrl: './consultation-button.component.css'
})
export class ConsultationButtonComponent {
    @Output() closeModal = new EventEmitter<void>(); // Event to notify parent to close modal

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
Numéro_de_sécurité_sociale: "1",
Nom : "2",
Prénom: "3",
date_de_naissance: "4",
Adresse : "5",
Téléphone: "6",
Mutuelle: "7",
Médecin_traitant: "8",
Personne_à_contacter: "9",
Code_QR: "10",

  }
]
dataKeys :string[] = Object.keys(this.items[0]);

show:boolean=true;

delete(){
  this.show=false;
}

}
