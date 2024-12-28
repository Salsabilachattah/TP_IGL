import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AffichageinfoComponent } from '../../../../components/affichageinfo/affichageinfo.component';
import { BouttonretourComponent } from '../../../../components/bouttonretour/bouttonretour.component';
import { MenuComponent } from '../../../../components/menu/menu.component';
@Component({
  selector: 'app-demandebio',
  imports: [MenuComponent,BouttonretourComponent,FormsModule,AffichageinfoComponent],
  templateUrl: './demandebio.component.html',
  styleUrl: './demandebio.component.css'
})
export class DemandebioComponent {
  bilanBio :string ='';
  constructor(private router: Router){};
  save(){
    //envoyer au backend
    if(this.bilanBio !=''){
      alert("Bilan sauvegardé avec succés !"); 
      this.bilanBio='';
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
