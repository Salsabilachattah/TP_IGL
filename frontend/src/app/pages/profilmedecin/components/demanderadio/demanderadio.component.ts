import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AffichageinfoComponent } from '../../../../components/affichageinfo/affichageinfo.component';
@Component({
  selector: 'app-demanderadio',
  imports: [FormsModule,AffichageinfoComponent],
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
}
