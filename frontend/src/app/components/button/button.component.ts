import { Component , Input} from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  standalone: true, 
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() text: string = '';
  constructor(){}
}

