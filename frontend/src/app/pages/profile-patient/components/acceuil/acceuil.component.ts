import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeMessageComponent } from '../../../../components/welcome-message/welcome-message.component'; 

@Component({
  selector: 'app-acceuil',
  imports: [CommonModule,WelcomeMessageComponent],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilMedecinComponent {
  userName: string = 'Patient';
}
