import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-soin-button',
  imports: [CommonModule],
  templateUrl: './soin-button.component.html',
  styleUrl: './soin-button.component.css'
})
export class SoinButtonComponent {// Donnée à afficher dans le paragraphe
  paragraphContent: string = "test soin";
   
show:boolean=true;

deletesoin(){
  this.show=false;
}

}
