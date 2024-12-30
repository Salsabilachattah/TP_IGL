import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prescription-button',
  imports: [CommonModule],
  templateUrl: './prescription-button.component.html',
  styleUrl: './prescription-button.component.css'
})
export class prescriptionButtonComponent {
// Donnée à afficher dans le paragraphe
paragraphContent: string = "Ceci est un bilan rapide du patient : Nom - Prénom - Médecin traitant.";
 
show:boolean=true;

deletepres(){
  this.show=false;
}

}
