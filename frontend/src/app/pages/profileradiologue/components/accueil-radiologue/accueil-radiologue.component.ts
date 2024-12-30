import { Component } from '@angular/core';
import { WelcomeMessageComponent } from '../../../../components/welcome-message/welcome-message.component'; 
@Component({
  selector: 'app-accueil-radiologue',
  imports: [WelcomeMessageComponent],
  templateUrl: './accueil-radiologue.component.html',
  styleUrl: './accueil-radiologue.component.css' 
})
export class AccueilRadiologueComponent {
  userName: string = 'Radiologue'; 
}
