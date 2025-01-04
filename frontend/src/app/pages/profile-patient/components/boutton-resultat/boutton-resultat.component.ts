import { Component ,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boutton-resultat',
  imports: [CommonModule],
  templateUrl: './boutton-resultat.component.html',
  styleUrl: './boutton-resultat.component.css'
})
export class BouttonResultatComponent {
// Donnée à afficher dans le paragraphe
@Input() paragraphContent: string = ""; // Reçoit la prescription
  
  deletebilan() {
    this.show = false;
  } show: boolean = true;

}
