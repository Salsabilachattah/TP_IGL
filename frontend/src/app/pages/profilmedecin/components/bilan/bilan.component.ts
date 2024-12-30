import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BilanButtonComponent } from '../bilan-button/bilan-button.component';
import { BouttonResultatComponent } from '../boutton-resultat/boutton-resultat.component';
import { BouttonEtatComponent } from '../boutton-etat/boutton-etat.component';
@Component({
  selector: 'app-bilan',
  imports:[BouttonEtatComponent,BouttonResultatComponent,CommonModule , BilanButtonComponent],
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.css']
})
export class BilanComponent {

  // Sample data structure for consultations
  consultation= [
    { date: '2024-12-01', type: 'Type A', prescription: 'Prescription 1', etat: 'Etat 1', resultat: 'Résultat 1',show: false,show2: false ,show3: false},
    { date: '2024-12-05', type: 'Type B', prescription: 'Prescription 2', etat: 'Etat 2', resultat: 'Résultat 2' ,show: false,show2: false,show3: false},
    // Add more consultation objects here
  ];
  


  // Function to handle the display of prescription
  show: boolean = false;
  show2: boolean = false;

  show3: boolean = false;


  displayPrescription(index: number) {
    this.consultation[index].show = !this.consultation[index].show;
  }

  hidePrescription(index: number) {
    this.consultation[index].show = false;
  }

  // Function to handle the display of etat
  displayEtat(index: number) {
    this.consultation[index].show2 = !this.consultation[index].show2;

  }

  hideEtat(index: number) {
    this.consultation[index].show2 = false;
  }


  // Function to handle the display of resultat
  displayResultat(index: number) {
    this.consultation[index].show3 = !this.consultation[index].show3;

  }

  hideResultat(index: number) {
    this.consultation[index].show3 = false;

  }
}
