import { Component ,Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PatientService } from '../../../../services/patient.service';
import { ResumeComponent } from '../../../profilmedecin/components/resume/resume.component';
import { ResumeService } from '../../../../services/resume.service'; 
@Component({
  selector: 'app-date-resume-container',
  standalone:true,
  imports:[ResumeComponent,CommonModule],
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css'],
})
export class ConsultationComponent {
  @Input() nss: string = ''; // Reçoit le NSS en entrée
  consultations: { date: string; summary: string }[] = [];
  errorMessage: string | null = null;

  constructor(
    private patientService: PatientService,
    private resumeService: ResumeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadConsultations();
  }

  loadConsultations(): void {
    if (this.nss) {
      this.patientService.getConsultationsbynss(this.nss).subscribe({
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
    } else {
      this.errorMessage = "NSS introuvable.";
    }
  }
  displayResume(consultation: { date: string; summary: string }, nss: string): void {
    console.log('Résumé transmis au service:', consultation.summary);
    console.log('NSS transmis au service:', nss);
  
    this.resumeService.setResumenss({ summary: consultation.summary, nss });
    this.router.navigate(['/medecin/resumedisplay'], { queryParams: { nss } });
  }
  
  
}