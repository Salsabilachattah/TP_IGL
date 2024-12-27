import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartType, registerables } from 'chart.js';
import {LeftSidebarComponent} from '../../components/left-sidebar/left-sidebar.component'
import { form_laboratinComponent } from '../profillaborantin/components/form_laboratin/form_laboratin.component';
import { TableComponent } from '../../components/table/table.component';
import{DemandeLaboratinComponent} from '../profillaborantin/components/demande-laboratin/demande-laboratin.component'
import {form_radiologueComponent}from "./components/form-radiologue/form-radiologue.component"
import { DemandeRadiologueComponent } from './components/demande-radiologue/demande-radiologue.component';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import{AccueilRadiologueComponent}from '../profileradiologue/components/accueil-radiologue/accueil-radiologue.component';
import { InfoPersoComponent } from './components/info-perso/info-perso.component';
import { BouttonretourComponent } from '../../components/bouttonretour/bouttonretour.component';
// Enregistrer les composants de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-profilradiologue',
  imports: [BouttonretourComponent,LeftSidebarComponent,AccueilRadiologueComponent,BackgroundVideoComponent,form_radiologueComponent,DemandeRadiologueComponent, DemandeLaboratinComponent, form_laboratinComponent, CommonModule],
  templateUrl: './profileradiologue.component.html',
  styleUrls: ['./profileradiologue.component.css']
})
export class profilradiologueComponent {
  public chart: any; // Référence au graphique
  
 
  
  isSidebarCollapsed: boolean = true;
  currentComponent: any = null;

  // Définition des éléments de la barre latérale dynamiquement
  sidebarItems = [
    {
      icon: 'mdi:account-circle',
      label: 'Mon Profil',
      component: 'AccueilRadiologueComponent',
    },
    {
      icon: 'mdi:file-document',
      label: 'Les demandes',
      component: 'DemandeRadiologueComponent',
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
  if (component === 'AccueilRadiologueComponent') {
    this.currentComponent = AccueilRadiologueComponent;
    this.showVideo = true; // Show the video for Accueil
  } else if (component === 'InfoPersoComponent') {
    this.currentComponent = InfoPersoComponent;
    this.showVideo = false; // No video for other components
  } else if (component === 'DemandeRadiologueComponent') {
    this.currentComponent = DemandeRadiologueComponent;
    this.showVideo = false; // No video for demands
  } else {
    this.currentComponent = null;
    this.showVideo = false; // Default: no video
  }
}

 
}
