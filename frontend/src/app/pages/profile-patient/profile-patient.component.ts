import { Component } from '@angular/core';
import { RadioGroupComponent } from '../../components/radio-group/radio-group.component';
import { LeftSidebarComponent } from '../../components/left-sidebar/left-sidebar.component';
import { CommonModule } from '@angular/common';
import { AffichageinfoComponent } from '../../components/affichageinfo/affichageinfo.component';
@Component({
  selector: 'app-profile-patient',
   imports: [AffichageinfoComponent,CommonModule,LeftSidebarComponent,RadioGroupComponent],
  templateUrl: './profile-patient.component.html',
})
export class ProfilePatientComponent {
   
  
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
    // this.currentComponent = AcceuilMedecinComponent;
      } else if (component === 'ListePatientComponent') {
    //  this.currentComponent = ListePatientComponent;
      } 
      else if (component === 'InfoPersoComponent') {
     //   this.currentComponent = InfoPersoComponent;
       }else {
        this.currentComponent = null;
      }
    }
  }
  