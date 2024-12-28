import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-soin',
  imports:[CommonModule],
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

  displaySoin(soin: { date: string; soin: string ; infermier: string}): void {
    alert(`Résumé for ${soin.date}: ${soin.soin}`);
  }
}
