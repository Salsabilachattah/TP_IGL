import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bilan-button',
  imports: [CommonModule],
  templateUrl: './bilan-button.component.html',
  styleUrl: './bilan-button.component.css'
})
export class BilanButtonComponent {
 // Donnée à afficher dans le paragraphe
 paragraphContent: string = "Ceci est un bilan rapide du patient : Nom - Prénom - Médecin traitant.";
 show: boolean = true;


deletebilan(){
this.show=false;
}
}
