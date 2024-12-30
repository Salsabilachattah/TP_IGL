import { Component } from '@angular/core';
import { SearchbarComponent } from '../profilmedecin/components/searchbar/searchbar.component';
import { StatsComponent } from '../profilmedecin/components/stats/stats.component';
import { InfoPersoComponent } from './components/info-perso/info-perso.component';
import { AccueilinfirmierComponent } from './components/accueilinfirmier/accueilinfirmier.component';
import { LeftSidebarComponent } from '../../components/left-sidebar/left-sidebar.component';
import { CommonModule } from '@angular/common';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { ListePatientComponent } from './components/liste-patient/liste-patient.component';
import { SoinsGComponent } from './components/soins-g/soins-g.component';
@Component({
  selector: 'app-profileinfirmier',
  imports: [SoinsGComponent,ListePatientComponent,CommonModule,BackgroundVideoComponent,LeftSidebarComponent,AccueilinfirmierComponent,InfoPersoComponent,SearchbarComponent, StatsComponent],
  templateUrl: './profileinfirmier.component.html',
  styleUrl: './profileinfirmier.component.css'
})
export class ProfileinfirmierComponent {
 
  isSidebarCollapsed: boolean = true;
  currentComponent: any = null;
  
  // Définition des éléments de la barre latérale dynamiquement
  sidebarItems = [
    {
      icon: 'mdi:account-circle',
      label: 'Mon Profil',
      component: 'AccueilinfirmierComponent',
    },
    {
      icon: 'mdi:account-multiple',
      label: 'Liste des Patients',
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
    if (component === 'ListePatientComponent') {
this.currentComponent = ListePatientComponent;
    } else if (component === 'AccueilinfirmierComponent') {
     this.currentComponent = AccueilinfirmierComponent;
    } 
    else if (component === 'InfoPersoComponent') {
      this.currentComponent = InfoPersoComponent;
     }else {
      this.currentComponent = null;
    }
  }
}
