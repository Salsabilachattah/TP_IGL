import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilAdminComponent } from './component/accueil-admin/accueil-admin.component';
import { FormComponent } from '../../components/form/form.component';
import { LeftSidebarComponent } from '../../components/left-sidebar/left-sidebar.component';
import { CreedpiComponent } from './component/creedpi/creedpi.component';
import { InfoPersoComponent } from './component/info-perso/info-perso.component';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
  @Component({
  selector: 'app-profile-admin',
  imports: [InfoPersoComponent,BackgroundVideoComponent,CreedpiComponent,LeftSidebarComponent,CommonModule,AccueilAdminComponent,FormComponent],
  templateUrl: './profile-admin.component.html',
  styleUrl: './profile-admin.component.css'
})
export class ProfileAdminComponent {

 
  isSidebarCollapsed: boolean = true;
  currentComponent: any = null;
  
  // Définition des éléments de la barre latérale dynamiquement
  sidebarItems = [
    {
      icon: 'mdi:account-circle',
      label: 'Mon Profil',
      component: 'AccueilAdminComponent',
    },
    {
      icon: 'mdi:file-document',
      label: 'Créer un nouveau DPI',
      component: 'CreedpiComponent',
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
    if (component === 'CreedpiComponent') {
     this.currentComponent = CreedpiComponent;
    } else if (component === 'AccueilAdminComponent') {
     this.currentComponent = AccueilAdminComponent;
    } 
    else if (component === 'InfoPersoComponent') {
      this.currentComponent = InfoPersoComponent;
     }else {
      this.currentComponent = null;
    }
  }
}
