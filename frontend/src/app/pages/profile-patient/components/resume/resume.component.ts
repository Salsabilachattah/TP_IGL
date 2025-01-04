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

@Component({
  selector: 'app-resume',
  imports: [MenuComponent, BouttonretourComponent, FormsModule, AffichageinfoComponent],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumepatientComponent {
  resume: string = '';

 


  rowData = {
    numero: '',
    nom: '',
    prenom: ''
  };

  fieldOrder = ['numero', 'nom', 'prenom'];

  constructor(private resumeService: ResumeService,private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadPatientInfo();
    this.resume = this.resumeService.getResume();
    if (!this.resume) {
      this.resume = 'Résumé non disponible.';
    }
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
    this.rowData.numero = user.nss || 'Non spécifié'; // Numéro de sécurité sociale
    this.rowData.nom = user.nom || 'Non spécifié';
    this.rowData.prenom = user.prenom || 'Non spécifié';
  }
}
