import { Component } from '@angular/core';
import { WelcomeMessageComponent } from '../../../../components/welcome-message/welcome-message.component'; 
@Component({
  selector: 'app-accueilinfirmier',
  imports: [WelcomeMessageComponent],
  templateUrl: './accueilinfirmier.component.html',
  styleUrl: './accueilinfirmier.component.css'
})
export class AccueilinfirmierComponent {
  userName: string = 'Infirmier';
}
