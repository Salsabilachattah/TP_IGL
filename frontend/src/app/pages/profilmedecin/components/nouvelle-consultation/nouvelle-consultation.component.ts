import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AffichageinfoComponent } from '../../../../components/affichageinfo/affichageinfo.component';
@Component({
  selector: 'app-nouvelle-consultation',
  imports: [AffichageinfoComponent],
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

}




