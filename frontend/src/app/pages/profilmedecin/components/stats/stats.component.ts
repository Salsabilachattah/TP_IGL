import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../../../services/patient.service';
@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [PatientService,FormsModule,CommonModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  nombre_patient: string = ''; // Initialisez avec une chaîne vide

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.getNombrePatients().subscribe({
      next: (data) => {
        this.nombre_patient = data.toString(); // Convertir en chaîne de caractères
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }
}
