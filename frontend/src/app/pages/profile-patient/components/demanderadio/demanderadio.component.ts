import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AffichageinfoComponent } from '../../../../components/affichageinfo/affichageinfo.component';
import { BouttonretourComponent } from '../../../../components/bouttonretour/bouttonretour.component';
import { MenuComponent } from '../../../../components/menu/menu.component';

@Component({
  selector: 'app-demanderadio',
  imports: [MenuComponent, BouttonretourComponent,  FormsModule,AffichageinfoComponent],
  templateUrl: './demanderadio.component.html',
  styleUrl: './demanderadio.component.css'
})
export class DemanderadioComponent {
  bilanRadio :string ='';
  constructor (private router: Router){}
  save(){
    //envoyer au backend
    if(this.bilanRadio !=''){
      alert("Bilan sauvegardé avec succés !"); 
      this.bilanRadio='';
      this.router.navigate(['/medecin/bilans']);
    }else{
      alert("Remplissez d'abord!")
    }
  }
  
  rowData = {
    numero: '001',
    nom: 'Doe',
    prenom: 'John'
  };

  fieldOrder = ['numero', 'nom', 'prenom'];

}
