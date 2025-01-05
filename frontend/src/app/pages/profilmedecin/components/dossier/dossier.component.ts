import { Component } from '@angular/core';
import { RadioGroupComponent } from '../../../../components/radio-group/radio-group.component';
import { MenuComponent } from '../../../../components/menu/menu.component';
import { BouttonretourComponent } from '../../../../components/bouttonretour/bouttonretour.component';
import { AffichageinfoComponent } from '../../../../components/affichageinfo/affichageinfo.component';
import { BilanComponent } from '../bilan/bilan.component';
import { ConsultationComponent } from '../consultation/consultation.component';
import { InfoPersoMedComponent } from '../info-perso-med/info-perso-med.component';
import { PrescriptionComponent } from '../prescription/prescription.component';
import { SoinComponent } from '../soin/soin.component';
import { CommonModule } from '@angular/common';
import { MedecinService } from '../../../../services/medecin.service';
@Component({
  selector: 'app-dossier',
  imports: [CommonModule,SoinComponent,PrescriptionComponent,InfoPersoMedComponent,BilanComponent,ConsultationComponent,AffichageinfoComponent,BouttonretourComponent,MenuComponent,RadioGroupComponent],
  templateUrl: './dossier.component.html',
  styleUrl: './dossier.component.css'
})
export class DossierComponent {
  radioOptions = [
    { label: 'Inofrmations personnelles', value: 'A' },
    { label: 'Consultation', value: 'B' },
    { label: 'Bilans', value: 'C' },
    { label: 'Prescriptions médicales', value: 'D' },
    { label: 'Soins', value: 'E' },


  ];

  selectedOption: string = 'A'; // Option par défaut
  patientData: any = {}; // Pour stocker les données du patient
  nss: string = '';
  constructor(private medecinService: MedecinService) {}

  ngOnInit(): void {
    // Récupérer les détails du patient
    this.patientData = this.medecinService.getSelectedPatient();
    console.log("Détails du patient:", this.patientData);
    if (this.patientData && this.patientData.numero !== undefined) {
      this.patientData.numero = this.patientData.numero.toString();
    }
    if (this.patientData) {
      if (this.patientData.role && !isNaN(Number(this.patientData.role))) {
        this.nss = this.patientData.role; // Assigns role to nss if it's a number-like string
      } else if (this.patientData.nss) {
        this.nss = this.patientData.nss; // Assigns nss if role is not a number-like string
      }
    }
  this.patientData.num=this.nss;
  }

  onSelectionChange(value: string): void {
    this.selectedOption = value;
  }

  fieldOrder = ['num', 'nom', 'prenom'];
}
