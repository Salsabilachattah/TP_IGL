import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormComponent } from '../form/form.component'; 
import { MenuComponent } from '../../../../components/menu/menu.component';
import { PatientService } from '../../../../services/patient.service';

@Component({
  selector: 'app-creedpi',
  imports: [MenuComponent, CommonModule, FormComponent],
  templateUrl: './creedpi.component.html',
  styleUrl: './creedpi.component.css',
})
export class CreedpiComponent {
  fields: Array<string> = [
    "Numéro de sécurité sociale",
    "Nom",
    "Prénom",
    "Date de naissance",
    "Adresse",
    "Numéro de téléphone",
    "Mutuelle",
  ];

  constructor(private patientService: PatientService) {}

 
  onFormSubmit(formData: { [key: string]: string }) {
    const processedData = {
      nss: parseInt(formData['Numéro de sécurité sociale'], 10),
      nom: formData['Nom'].trim(),
      prenom: formData['Prénom'].trim(),
      date_de_naissance: formData['Date de naissance'],
      adresse: formData['Adresse']?.trim() || null,
      telephone: formData['Numéro de téléphone']?.trim() || null,
      mutuelle: formData['Mutuelle']?.trim() || null,
    };
  
    if (isNaN(processedData.nss)) {
      alert("Le numéro de sécurité sociale doit être un entier valide.");
      return;
    }
  
    this.patientService.createDPI(processedData).subscribe({
      next: (response) => {
        alert('DPI créé avec succès !');
      },
      error: (err) => {
        console.error('Erreur lors de la création du DPI:', err);
        alert('Une erreur est survenue lors de la création du DPI.');
      },
    });
  }
  
}
