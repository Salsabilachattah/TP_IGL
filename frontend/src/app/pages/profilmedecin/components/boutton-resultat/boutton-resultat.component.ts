import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boutton-resultat',
  imports: [CommonModule],
  templateUrl: './boutton-resultat.component.html',
  styleUrl: './boutton-resultat.component.css'
})
export class BouttonResultatComponent {
// Donnée à afficher dans le paragraphe
paragraphContent: string = "Ceci est un bilan rapide du patient : Nom - Prénom - Médecin traitant.";
 
show:boolean=true;

deletebilan(){
this.show=false;
}
}
