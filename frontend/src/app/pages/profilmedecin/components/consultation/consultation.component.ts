import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from '../resume/resume.component';
import { Router } from '@angular/router';
import { ConsultationButtonComponent } from '../consultation-button/consultation-button.component';
@Component({
  selector: 'app-date-resume-container',
  imports:[ResumeComponent,ConsultationButtonComponent,CommonModule],
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
  constructor(private router: Router) {}
  // Modifiez cette méthode pour rediriger vers la page "resumer"
  show: boolean = false;

  displayResume() {
    this.show = true;
  }

  hideResume() {
    this.show = false;
  }
}
