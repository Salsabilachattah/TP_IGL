import { Component } from '@angular/core';
import { InfodisplayComponent } from '../infodisplay/infodisplay.component';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-showmorebutton',
  imports: [InfodisplayComponent ,NgIf],
  templateUrl: './showmorebutton.component.html',
  styleUrl: './showmorebutton.component.css'
})
export class ShowmorebuttonComponent {
  showInfo = false; 

  toggleInfo() {
    this.showInfo = !this.showInfo; 
  }
}