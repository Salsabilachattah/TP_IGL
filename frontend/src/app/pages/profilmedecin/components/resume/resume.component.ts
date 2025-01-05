import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AffichageinfoComponent } from '../../../../components/affichageinfo/affichageinfo.component'; 
import { MenuComponent } from '../../../../components/menu/menu.component';
import { BouttonretourComponent } from '../../../../components/bouttonretour/bouttonretour.component';
import { AuthService } from '../../../../services/auth.service';
import { ResumeService } from '../../../../services/resume.service';
interface NavigationState {
  resume?: string;
}

import { ActivatedRoute } from '@angular/router';
import { MedecinService } from '../../../../services/medecin.service';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [MenuComponent, BouttonretourComponent, FormsModule, AffichageinfoComponent],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {
  resume: string = '';
  nss: string = '';
  rowData = { numero: '', nom: '', prenom: '' };
  fieldOrder = ['numero', 'nom', 'prenom'];

  constructor(private resumeService: ResumeService, private route: ActivatedRoute,private medecinservice :MedecinService) {  console.log('Constructeur de ResumeComponent appelé');}

  ngOnInit(): void {
    console.log('ngOnInit de ResumeComponent appelé');
    // Récupérer les données depuis ResumeService
    const resumeData = this.resumeService.getResumenss();
    this.rowData={
      numero:this.medecinservice.selectedPatient.role,
      nom:this.medecinservice.selectedPatient.nom,
      prenom:this.medecinservice.selectedPatient.prenom
    }
    if (resumeData) {
      this.resume = resumeData.summary || 'Résumé non disponible.';
      this.nss = resumeData.nss || 'NSS non spécifié';
    } else {
      console.log('Aucune donnée disponible dans ResumeService');
      this.resume = 'Aucun résumé trouvé.';
    }
  }
}