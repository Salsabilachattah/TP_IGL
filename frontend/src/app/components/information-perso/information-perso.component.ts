import { Component , Input} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-information-perso',
  imports: [CommonModule],
  templateUrl: './information-perso.component.html',
  styleUrl: './information-perso.component.css'
})
export class InformationPersoComponent {
  @Input() labels: string[] = []; // Les étiquettes des champs
  @Input() formData: { [key: string]: string } = {}; // Les données à afficher

  editInformation() {
    console.log('Modification des informations');
    // Ajouter ici la logique pour éditer si nécessaire
  }
}
