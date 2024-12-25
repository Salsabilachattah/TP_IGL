import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-affichageinfo',
  imports: [CommonModule],
  templateUrl: './affichageinfo.component.html',
  styleUrl: './affichageinfo.component.css'
})
export class AffichageinfoComponent {
  @Input() data: { [key: string]: any } = {};
  @Input() fieldOrder: string[] = [];
  ngOnChanges() {
    console.log('Données reçues :', this.data);
    console.log('Ordre des champs :', this.fieldOrder);
  }
}