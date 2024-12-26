import { Component,Input } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome-message',
  imports: [MenuComponent,CommonModule],
  templateUrl: './welcome-message.component.html',
  styleUrl: './welcome-message.component.css'
})
export class WelcomeMessageComponent {
  @Input() userName: string = 'Admin'; // Nom par défaut
}
