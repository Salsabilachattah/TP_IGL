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
import { FormsModule } from '@angular/forms';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { ListePatientComponent } from './components/liste-patient/liste-patient.component';
@Component({
  selector: 'app-profilmedecin',
  imports: [ListePatientComponent,FormsModule,InfoPersoComponent,BackgroundVideoComponent,LeftSidebarComponent,RouterModule,TableauComponent,SearchbarComponent,StatsComponent,Tableau2Component,CommonModule,MenuComponent,AcceuilMedecinComponent,NouvelleConsultationComponent],
  templateUrl: './profilmedecin.component.html',
  styleUrl: './profilmedecin.component.css'
})
export class ProfilmedecinComponent {
 
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
      icon: 'mdi:account-multiple',
      label: 'Liste des Patients ',
      component: 'ListePatientComponent',
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

  displayDynamicComponent(component: string): void {
    // Mappez le nom de la chaîne à la référence du composant
    if (component === 'AcceuilMedecinComponent') {
   this.currentComponent = AcceuilMedecinComponent;
    } else if (component === 'ListePatientComponent') {
    this.currentComponent = ListePatientComponent;
    } 
    else if (component === 'InfoPersoComponent') {
      this.currentComponent = InfoPersoComponent;
     }else {
      this.currentComponent = null;
    }
  }
}
