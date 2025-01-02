import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { MenuComponent } from '../../../../components/menu/menu.component';
import { PatientService } from '../../../../services/patient.service';

@Component({
  selector: 'app-creedpi',
  imports: [MenuComponent, CommonModule, FormComponent],
  templateUrl: './creedpi.component.html',
  styleUrls: ['./creedpi.component.css']
})
export class CreedpiComponent {
  fields: string[] = [
    "Nom", "Prenom", "Numéro de sécurité sociale", 
    "Date de naissance", "Adresse", "Numéro de téléphone", 
    "Mutuelle"
  ];

  constructor(private patientService: PatientService) {}

  handleFormSubmit(formData: { [key: string]: string }) {
    this.patientService.createDPI(formData).subscribe({
      next: (response) => {
        console.log('DPI créé avec succès :', response);
        alert('Dossier patient créé avec succès !');
      },
      error: (error) => {
        console.error('Erreur lors de la création du DPI :', error);
        alert('Erreur lors de la création du dossier patient.');
      }
    });
  }
  
}
