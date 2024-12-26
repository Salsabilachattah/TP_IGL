import { Component } from '@angular/core';
import { WelcomeMessageComponent } from '../../../../components/welcome-message/welcome-message.component'; 
@Component({
  selector: 'app-accueil-laborantin',
  imports: [WelcomeMessageComponent],
  templateUrl: './accueil-laborantin.component.html',
  styleUrl: './accueil-laborantin.component.css'
}) 
export class AccueilLaborantinComponent {
  userName: string = 'Laborantin'; 
}
