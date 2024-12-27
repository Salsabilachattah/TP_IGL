import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartType, registerables } from 'chart.js';
import {LeftSidebarComponent} from '../../components/left-sidebar/left-sidebar.component'
import { form_laboratinComponent } from './components/form_laboratin/form_laboratin.component';
import { TableComponent } from '../../components/table/table.component';
import{DemandeLaboratinComponent} from './components/demande-laboratin/demande-laboratin.component'
import {form_radiologueComponent}from "../profileradiologue/components/form-radiologue/form-radiologue.component"
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { AccueilLaborantinComponent } from './components/accueil-laborantin/accueil-laborantin.component';
import { InfoPersoComponent } from './components/info-perso/info-perso.component';
 import { BouttonretourComponent } from '../../components/bouttonretour/bouttonretour.component';  // Enregistrer les composants de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-profillaborantin',
  imports: [BouttonretourComponent,LeftSidebarComponent,InfoPersoComponent,AccueilLaborantinComponent,BackgroundVideoComponent ,form_radiologueComponent, DemandeLaboratinComponent, form_laboratinComponent, CommonModule, ],
  templateUrl: './profillaborantin.component.html',
  styleUrls: ['./profillaborantin.component.css']
})
export class profillaborantinComponent {
  public chart: any; // Référence au graphique
  
 
  
  isSidebarCollapsed: boolean = true;
  currentComponent: any = null;

  // Définition des éléments de la barre latérale dynamiquement
  sidebarItems = [
    {
      icon: 'mdi:account-circle',
      label: 'Mon Profil',
      component: 'AccueilLaborantinComponent',
    },
    {
      icon: 'mdi:file-document',
      label: 'Les demandes',
      component: 'DemandeLaboratinComponent',
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
  if (component === 'AccueilLaborantinComponent') {
    this.currentComponent = AccueilLaborantinComponent;
    this.showVideo = true; // Show the video for Accueil
  } else if (component === 'InfoPersoComponent') {
    this.currentComponent = InfoPersoComponent;
    this.showVideo = false; // No video for other components
  } else if (component === 'DemandeLaboratinComponent') {
    this.currentComponent = DemandeLaboratinComponent;
    this.showVideo = false; // No video for demands
  } else {
    this.currentComponent = null;
    this.showVideo = false; // Default: no video
  }
}


}
