import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from '../../../profilmedecin/components/resume/resume.component'; 
import { Router } from '@angular/router';
import { PatientService } from '../../../../services/patient.service';
import { ResumeService } from '../../../../services/resume.service';
@Component({
  selector: 'app-date-resume-container',
  imports:[ResumeComponent,CommonModule],
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css'],
})
export class ConsultationComponent {
  consultations: { date: string; summary: string }[] = [];
  errorMessage: string | null = null;

  constructor(private patientService: PatientService,private resumeService: ResumeService, private router: Router) {}

  ngOnInit(): void {
    this.loadConsultations();
  }

  loadConsultations(): void {
    this.patientService.getConsultations().subscribe({
      next: (data: any[]) => {
        console.log('Données des consultations:', data);
        this.consultations = data.map(consultation => ({
          date: consultation.created_at,
          summary: consultation.resume || "Aucun résumé disponible",
        }));
        if (this.consultations.length === 0) {
          this.errorMessage = "Aucune consultation trouvée pour ce patient.";
        }
      },
      error: (error) => {
        this.errorMessage = "Erreur lors de la récupération des consultations.";
        console.error(error);
      },
    });
  }

  displayResume(consultation: { date: string; summary: string }): void {
    this.resumeService.setResume(consultation.summary);
    this.router.navigate(['/patient/resume']);
  }
  
}