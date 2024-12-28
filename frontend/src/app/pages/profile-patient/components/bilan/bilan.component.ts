import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-bilan',
  imports:[CommonModule],
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
  displayPrescription(consultation: any) {
    alert(`Prescription: ${consultation.prescription}`);
    // You can add more logic here for displaying prescription details
  }

  // Function to handle the display of etat
  displayEtat(consultation: any) {
    alert(`Etat: ${consultation.etat}`);
    // You can add more logic here for displaying etat details
  }

  // Function to handle the display of resultat
  displayResultat(consultation: any) {
    alert(`Résultat: ${consultation.resultat}`);
    // You can add more logic here for displaying resultat details
  }
}
