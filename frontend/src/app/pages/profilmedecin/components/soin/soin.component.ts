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
    { date: '2024-12-25', soin: 'Consultation for general health evaluation', infermier:'ikrem' },
    { date: '2024-12-18', soin: 'Follow-up for previous treatment' ,infermier:'noor'},
    { date: '2024-12-10', soin: 'Routine check-up' , infermier:'dji'},
  ];

  ngOnInit() {
    console.log(this.soins); // Vérifiez que les données sont chargées
  }

  show: boolean = false;

  displaySoin() {
    this.show = true;
  }

  hideSoin() {
    this.show = false;
  }
}
