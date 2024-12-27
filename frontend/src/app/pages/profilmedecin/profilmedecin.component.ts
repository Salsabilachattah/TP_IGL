import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableauComponent } from './components/tableau/tableau.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { StatsComponent } from './components/stats/stats.component';
import { Tableau2Component } from './components/tableau2/tableau2.component';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../components/menu/menu.component';
import { AcceuilMedecinComponent } from './components/acceuil-medecin/acceuil-medecin.component';
import { NouvelleConsultationComponent } from './components/nouvelle-consultation/nouvelle-consultation.component';
import { LeftSidebarComponent } from '../../components/left-sidebar/left-sidebar.component';
import { InfoPersoComponent } from './components/info-perso/info-perso.component';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { ConsultationComponent } from './components/consultation/consultation.component';
import { BilanComponent } from './components/bilan/bilan.component';
import { PrescriptionComponent } from './components/prescription/prescription.component';
import { SoinComponent } from './components/soin/soin.component';
import { InfoPersoMedComponent } from './components/info-perso-med/info-perso-med.component'
@Component({
  selector: 'app-profilmedecin',
  imports: [InfoPersoComponent,SoinComponent,InfoPersoMedComponent ,PrescriptionComponent,BilanComponent,ConsultationComponent,BackgroundVideoComponent,LeftSidebarComponent,RouterModule,TableauComponent,SearchbarComponent,StatsComponent,Tableau2Component,CommonModule,MenuComponent,AcceuilMedecinComponent,NouvelleConsultationComponent],
  templateUrl: './profilmedecin.component.html',
  styleUrl: './profilmedecin.component.css'
})
export class ProfilmedecinComponent {
  fields : Array<string> = ["nom", "prenom","nss","age"];
  fields2 :Array<string> = ["Nom", "Prénom","Plus d'informations","Dossier du patient","Consultation"];
  list :Array<string> = ["Afficher","Visualiser","Commencer"];


  isSidebarCollapsed: boolean = true;
  currentComponent: any = null;
  
  // Définition des éléments de la barre latérale dynamiquement
  sidebarItems = [
    {
      icon: 'mdi:account-circle',
      label: 'Mon Profil',
      component: 'AcceuilMedecinComponent',
    },
    {
      icon: 'mdi:file-document',
      label: 'Créer un nouveau DPI',
      component: 'InfoPersoMedComponent',
    },
    {
      icon: 'mdi:account-card-details',
      label: ' informations personnelles',
      component: 'InfoPersoComponent',
    },
  ];

  toggleSidebar(collapsed: boolean): void {
    this.isSidebarCollapsed = collapsed;
  }
  showVideo: boolean = true;
  displayDynamicComponent(component: string): void {
    // Mappez le nom de la chaîne à la référence du composant
    if (component === 'AcceuilMedecinComponent') {
   this.currentComponent = AcceuilMedecinComponent;
   this.showVideo = true;
    } else if (component === 'InfoPersoMedComponent') {
     this.currentComponent = InfoPersoMedComponent;
     this.showVideo = false;
    } 
    else if (component === 'consultation') {
      this.currentComponent = ConsultationComponent;
     }else {
      //this.currentComponent = null;
    }
  }
}
