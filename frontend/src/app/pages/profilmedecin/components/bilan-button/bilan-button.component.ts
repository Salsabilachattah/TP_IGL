import { Component ,Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bilan-button',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './bilan-button.component.html',
  styleUrl: './bilan-button.component.css'
})
export class BilanButtonComponent {
 // Donnée à afficher dans le paragraphe
 @Input() paragraphContent: string = ''; 
 show: boolean = true;


deletebilan(){
this.show=false;
}
}
