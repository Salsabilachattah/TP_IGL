import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AffichageinfoComponent } from '../../../../components/affichageinfo/affichageinfo.component'; 
import { MenuComponent } from '../../../../components/menu/menu.component';
import { BouttonretourComponent } from '../../../../components/bouttonretour/bouttonretour.component';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-resume',
  imports: [MenuComponent, BouttonretourComponent, FormsModule, AffichageinfoComponent],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumepatientComponent {
 
  resume: string = 'Voici le résumé de la consultation  : ...'; // Texte statique à afficher


  rowData = {
    numero: '',
    nom: '',
    prenom: ''
  };

  fieldOrder = ['numero', 'nom', 'prenom'];

  constructor(private router: Router, private authService: AuthService) {}

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
    this.rowData.numero = user.nss || 'Non spécifié'; // Numéro de sécurité sociale
    this.rowData.nom = user.nom || 'Non spécifié';
    this.rowData.prenom = user.prenom || 'Non spécifié';
  }
}