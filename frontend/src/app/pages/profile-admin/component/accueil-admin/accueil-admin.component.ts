import { Component } from '@angular/core';
import { WelcomeMessageComponent } from '../../../../components/welcome-message/welcome-message.component'; 
@Component({
  selector: 'app-accueil-admin',
  imports: [WelcomeMessageComponent],
  templateUrl: './accueil-admin.component.html',
  styleUrl: './accueil-admin.component.css'
})
export class AccueilAdminComponent {
  userName: string = 'Admin'; 
}
