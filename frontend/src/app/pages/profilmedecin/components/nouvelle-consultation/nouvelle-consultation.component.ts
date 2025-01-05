import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AffichageinfoComponent } from '../../../../components/affichageinfo/affichageinfo.component';
import { BouttonretourComponent } from '../../../../components/bouttonretour/bouttonretour.component';
import { MenuComponent } from '../../../../components/menu/menu.component';
import { MedecinService } from '../../../../services/medecin.service';

@Component({
  selector: 'app-nouvelle-consultation',
  imports: [MenuComponent, BouttonretourComponent, AffichageinfoComponent],
  templateUrl: './nouvelle-consultation.component.html',
  styleUrl: './nouvelle-consultation.component.css',
})
export class NouvelleConsultationComponent {
  constructor(private router: Router, private medecinService: MedecinService) {}

  redigerordonnance() {
    this.router.navigate(['/medecin/ordonnance']);
  }
  redigerbilan() {
    this.router.navigate(['/medecin/bilans']);
  }
  ngOnInit(): void {
    console.log("patient")
    console.log(this.medecinService.createdConsultation);
   this.rowData = { numero: this.medecinService.createdConsultation.patient.nss,
    ...this.medecinService.createdConsultation.patient
    };
  }
  rowData = {
    nss: '',
    nom: '',
    prenom: '',
  };

  fieldOrder = ['numero', 'nom', 'prenom'];
}



