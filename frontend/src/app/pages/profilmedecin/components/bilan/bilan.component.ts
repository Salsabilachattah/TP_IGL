import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BilanButtonComponent } from '../bilan-button/bilan-button.component';
@Component({
  selector: 'app-bilan',
  imports:[CommonModule , BilanButtonComponent],
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.css']
})
export class BilanComponent {

  // Sample data structure for consultations
  consultations = [
    { date: '2024-12-01', type: 'Type A', prescription: 'Prescription 1', etat: 'Etat 1', resultat: 'Résultat 1' },
    { date: '2024-12-05', type: 'Type B', prescription: 'Prescription 2', etat: 'Etat 2', resultat: 'Résultat 2' },
    // Add more consultation objects here
  ];

  // Function to handle the display of prescription
  show: boolean = false;
  show2: boolean = false;

  show3: boolean = false;


  displayPrescription() {
    this.show = true;
  }

  hidePrescription() {
    this.show = false;
  }

  // Function to handle the display of etat
  displayEtat() {
    this.show2 = true;

  }

  hideEtat() {
    this.show2 = false;

  }


  // Function to handle the display of resultat
  displayResultat() {
    this.show3 = true;

  }

  hideResultat() {
    this.show3 = false;

  }
}
