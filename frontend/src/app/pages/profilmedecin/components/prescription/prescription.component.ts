import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-date-resume-container',
  imports:[CommonModule],
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css'],
})
export class PrescriptionComponent {
    prescription = [
    { date: '2024-12-25', contenu: 'Consultation for general health evaluation' },
    { date: '2024-12-18', contenu: 'Follow-up for previous treatment' },
    { date: '2024-12-10', contenu: 'Routine check-up' },
  ];

  ngOnInit() {
    console.log(this.prescription); // Vérifiez que les données sont chargées
  }

  displayContenu(prescription: { date: string; contenu: string }): void {
    alert(`Résumé for ${prescription.date}: ${prescription.contenu}`);
  }
}
