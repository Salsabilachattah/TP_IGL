import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { prescriptionButtonComponent } from '../prescription-button/prescription-button.component';
@Component({
  selector: 'app-prescription',
  imports:[CommonModule , prescriptionButtonComponent],
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css'],
})
export class PrescriptionComponent {
    prescription = [
    { date: '2024-12-25', contenu: 'Consultation for general health evaluation',show: false },
    { date: '2024-12-18', contenu: 'Follow-up for previous treatment',show: false },
    { date: '2024-12-10', contenu: 'Routine check-up',show: false },
  ];

  ngOnInit() {
    console.log(this.prescription); // Vérifiez que les données sont chargées
  }

  show: boolean = false;

  displayContenu(index: number) {
    this.prescription[index].show = !this.prescription[index].show;
  }

  hideContenu(index: number) {
    this.prescription[index].show = false;
  }




  
}
