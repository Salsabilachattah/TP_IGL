import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AffichageinfoComponent } from '../../../../components/affichageinfo/affichageinfo.component';
import { BouttonretourComponent } from '../../../../components/bouttonretour/bouttonretour.component';
import { MenuComponent } from '../../../../components/menu/menu.component';
import { MedecinService } from '../../../../services/medecin.service';

@Component({
  selector: 'app-bilans',
  imports: [MenuComponent, BouttonretourComponent, AffichageinfoComponent],
  templateUrl: './bilans.component.html',
  styleUrl: './bilans.component.css'
})
export class BilansComponent {
  constructor (private router :Router,private medecinService:MedecinService){}

  redigerbilanradio(){
   if (this.medecinService.createdConsultation.bilanradio) {
     alert('bilan radiologique deja redigé');
     return;
   }
   this.router.navigate(['/medecin/bilans/demanderadio'])
  }

  redigerbilanbio(){
    if (this.medecinService.createdConsultation.bilanbio) {
      alert('bilan biologique deja redigé');
      return;
    }
    this.router.navigate(['/medecin/bilans/demandebio'])
  }

  redigeresume(){
    this.router.navigate(['/medecin/resume'])
  }
  
  ngOnInit(): void {
    this.rowData = { numero: this.medecinService.createdConsultation.patient.nss,
   ...this.medecinService.createdConsultation.patient
   };
 }
 rowData = {
   numero: '',
   nom: '',
   prenom: ''
 };

 fieldOrder = ['numero', 'nom', 'prenom'];


}




