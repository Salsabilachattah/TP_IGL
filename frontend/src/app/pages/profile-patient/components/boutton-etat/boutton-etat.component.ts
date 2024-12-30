import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boutton-etat',
  imports: [CommonModule],
  templateUrl: './boutton-etat.component.html',
  styleUrl: './boutton-etat.component.css'
})
export class BouttonEtatComponent {
// Donnée à afficher dans le paragraphe
paragraphContent: string = "Ceci est un bilan rapide du patient : Nom - Prénom - Médecin traitant.";
 

show:boolean=true;

deletebilan(){
this.show=false;
}
}
