import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilAdminComponent } from '../../components/accueil-admin/accueil-admin.component';
import { FormComponent } from '../../components/form/form.component';
import { LeftSidebarComponent } from '../../components/left-sidebar/left-sidebar.component';
import { MenuComponent } from './component/menu/menu.component';
@Component({
  selector: 'app-profile-admin',
  imports: [LeftSidebarComponent,CommonModule,AccueilAdminComponent,FormComponent,MenuComponent],
  templateUrl: './profile-admin.component.html',
  styleUrl: './profile-admin.component.css'
})
export class ProfileAdminComponent {

  fields: Array<string> = ["Nom", "Prenom","Numéro de sécurité sociale", "Date de naissance" , "Adresse" , "Numéro de téléphone","Mutuelle","Médecin traitant","Personne à contacter"]

  
  isSidebarCollapsed: boolean = false;
  currentComponent: any = null;

  // Définition des éléments de la barre latérale dynamiquement
  sidebarItems = [
    {
      icon: 'mdi:account-circle',
      label: 'Mon Profil',
      component: 'ProfileComponent',
    },
    {
      icon: 'mdi:file-document',
      label: 'Mon DPI',
      component: 'DpiComponent',
    },
  ];

  toggleSidebar(collapsed: boolean): void {
    this.isSidebarCollapsed = collapsed;
  }

  displayDynamicComponent(component: string): void {
    // Mappez le nom de la chaîne à la référence du composant
    if (component === 'ProfileComponent') {
     // this.currentComponent = ProfileComponent;
    } else if (component === 'DpiComponent') {
     // this.currentComponent = DpiComponent;
    } else {
      this.currentComponent = null;
    }
  }
}