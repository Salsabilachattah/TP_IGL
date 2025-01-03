import { Component } from '@angular/core';
import { RadioGroupComponent } from '../../components/radio-group/radio-group.component';
import { LeftSidebarComponent } from '../../components/left-sidebar/left-sidebar.component';
import { CommonModule } from '@angular/common';
import { AffichageinfoComponent } from '../../components/affichageinfo/affichageinfo.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component'; 
import { DossierComponent } from './components/dossier/dossier.component';
import { QrDisplayComponent } from './components/qr-display/qr-display.component';


@Component({
  selector: 'app-profile-patient',
   imports: [QrDisplayComponent,DossierComponent,BackgroundVideoComponent,AcceuilComponent,AffichageinfoComponent,CommonModule,LeftSidebarComponent,RadioGroupComponent],
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
        component: 'AcceuilComponent',
      },
      {
        icon: 'mdi:account-multiple',
        label: 'Mon dossier ',
        component: 'DossierComponent',
      },
      {
        icon: 'mdi:qrcode-scan'
,
        label: 'Mon code QR ',
        component: 'QrDisplayComponent',
      },
     
    ];
    
    toggleSidebar(collapsed: boolean): void {
      this.isSidebarCollapsed = collapsed;
    }
  
    displayDynamicComponent(component: string): void {
      // Mappez le nom de la chaîne à la référence du composant
      if (component === 'AcceuilComponent') {
     this.currentComponent = AcceuilComponent;
      } else if (component === 'DossierComponent') {
     this.currentComponent = DossierComponent;
      } else if (component === 'QrDisplayComponent') {
        this.currentComponent = QrDisplayComponent;
         } 
      else {
        this.currentComponent = null;
      }
    }
  }
  