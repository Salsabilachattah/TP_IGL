import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AffichageinfoComponent } from '../../../../components/affichageinfo/affichageinfo.component';
import { BouttonretourComponent } from '../../../../components/bouttonretour/bouttonretour.component';
import { MenuComponent } from '../../../../components/menu/menu.component';

@Component({
  selector: 'app-nouvelle-consultation',
  imports: [MenuComponent,BouttonretourComponent,AffichageinfoComponent],
  templateUrl: './nouvelle-consultation.component.html',
  styleUrl: './nouvelle-consultation.component.css',
})
export class NouvelleConsultationComponent {
  constructor(private router: Router ) {}

  redigerordonnance( ){
    this.router.navigate(['/medecin/ordonnance']);
  }
  redigerbilan( ){
    this.router.navigate(['/medecin/bilans']);
  }
 
  rowData = {
    numero: '001',
    nom: 'Doe',
    prenom: 'John'
  };

  fieldOrder = ['numero', 'nom', 'prenom'];
}