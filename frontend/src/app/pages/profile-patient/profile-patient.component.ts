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
  
  selectedOption: string | null = null;

  // Exemple d'options
  options = [
    { value: 'html', label: 'HTML' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' }
  ];

  onSelectionChange(value: string) {
    this.selectedOption = value; // Mettre à jour la valeur sélectionnée
  }




  rowData = {
    numero: '001',
    nom: 'Doe',
    prenom: 'John'
  };

  fieldOrder = ['numero', 'nom', 'prenom'];








  //hadi tae side bar

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
  //    this.currentComponent = ProfileComponent;
    } else if (component === 'DpiComponent') {
 //     this.currentComponent = DpiComponent;
    } else {
      this.currentComponent = null;
    }
  }

}
