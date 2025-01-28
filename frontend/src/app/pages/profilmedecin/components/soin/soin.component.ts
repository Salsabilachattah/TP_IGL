import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoinButtonComponent } from '../soin-button/soin-button.component';
@Component({
  selector: 'app-soin',
  imports:[CommonModule ,  SoinButtonComponent],
  templateUrl: './soin.component.html',
  styleUrls: ['./soin.component.css'],
})
export class SoinComponent {
  soins = [
    { date: '2025-01-29', soin: 'Consultation for general health evaluation', show: false },
    
  ];

  ngOnInit() {
    console.log(this.soins); // Vérifiez que les données sont chargées
  }

  show: boolean = false;


displaySoin(index: number) {
  this.soins[index].show = !this.soins[index].show;
}

hideSoin(index: number) {
  this.soins[index].show = false;
}
}
