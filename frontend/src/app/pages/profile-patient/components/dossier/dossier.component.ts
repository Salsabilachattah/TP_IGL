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
import { AuthService } from '../../../../services/auth.service';
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

  onSelectionChange(value: string): void {
    this.selectedOption = value;
  }
  data = {
    numero: '',
    nom: '',
    prenom: ''
  };

  fieldOrder = ['numero', 'nom', 'prenom'];


    constructor( private authService: AuthService) {}
  
    ngOnInit(): void {
      this.loadPatientInfo();
    }
  
    private loadPatientInfo(): void {
      if (this.authService.user) {
        // Si les informations de l'utilisateur sont déjà chargées
        this.setPatientInfo(this.authService.user);
      } else {
        // Sinon, les récupérer via le service
        this.authService.getUserInfo().subscribe((user) => {
          if (user) {
            this.setPatientInfo(user);
          }
        });
      }
    }
  
    private setPatientInfo(user: any): void {
      this.data.numero = user.nss || 'Non spécifié'; // Numéro de sécurité sociale
      this.data.nom = user.nom || 'Non spécifié';
      this.data.prenom = user.prenom || 'Non spécifié';
    }
  }
