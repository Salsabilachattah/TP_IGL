import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AffichageinfoComponent } from '../../../../components/affichageinfo/affichageinfo.component'; 
import { MenuComponent } from '../../../../components/menu/menu.component';
import { BouttonretourComponent } from '../../../../components/bouttonretour/bouttonretour.component';
import { MedecinService } from '../../../../services/medecin.service';  
@Component({
  selector: 'app-resume',
  imports: [MenuComponent,BouttonretourComponent,FormsModule,AffichageinfoComponent],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {
  constructor (private router : Router  , private medecinService : MedecinService){};
  resume :string = 'Voici le résumé de la consultation  : ...'; 
  
  ngOnInit() {
    this.rowData = {
      nss: this.medecinService.createdConsultation.patient.nss,
      nom: this.medecinService.createdConsultation.patient.nom,
      prenom: this.medecinService.createdConsultation.patient.prenom
    };
  }
  rowData = {
    nss: '',
    nom: '',
    prenom: '',
  };

  fieldOrder = ['nss', 'nom', 'prenom'];
}
