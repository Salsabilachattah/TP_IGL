import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeMessageComponent } from '../../../../components/welcome-message/welcome-message.component'; 

@Component({
  selector: 'app-acceuil-medecin',
  imports: [CommonModule,WelcomeMessageComponent],
  templateUrl: './acceuil-medecin.component.html',
  styleUrl: './acceuil-medecin.component.css'
})
export class AcceuilMedecinComponent {
  userName: string = 'Medecin';
}
