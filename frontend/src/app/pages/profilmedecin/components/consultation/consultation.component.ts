import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-date-resume-container',
  imports:[CommonModule],
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css'],
})
export class ConsultationComponent {
  consultations = [
    { date: '2024-12-25', summary: 'Consultation for general health evaluation' },
    { date: '2024-12-18', summary: 'Follow-up for previous treatment' },
    { date: '2024-12-10', summary: 'Routine check-up' },
  ];

  ngOnInit() {
    console.log(this.consultations); // Vérifiez que les données sont chargées
  }

  displayResume(consultation: { date: string; summary: string }): void {
    alert(`Résumé for ${consultation.date}: ${consultation.summary}`);
  }
}
