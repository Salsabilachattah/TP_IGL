import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bilan-button',
  imports: [CommonModule],
  templateUrl: './bilan-button.component.html',
  styleUrl: './bilan-button.component.css'
})
export class BilanButtonComponent {
  @Input() paragraphContent: string = ""; // Reçoit la prescription
  
  deletebilan() {
    this.show = false;
  } show: boolean = true;


}
