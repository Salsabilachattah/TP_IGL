import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AffichageinfoComponent } from '../../../../components/affichageinfo/affichageinfo.component';
import { BouttonretourComponent } from '../../../../components/bouttonretour/bouttonretour.component';
import { MenuComponent } from '../../../../components/menu/menu.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-rediger-resume',
  imports: [AffichageinfoComponent,BouttonretourComponent,MenuComponent,FormsModule],
  templateUrl: './rediger-resume.component.html',
  styleUrl: './rediger-resume.component.css'
})
export class RedigerResumeComponent {
  resume :string ='';
  constructor (private router: Router){}
  save(){
    //envoyer au backend
    if(this.resume !=''){
      alert("Résumé sauvegardé avec succés !"); 
      this.resume='';
      this.router.navigate(['/medecin']);
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
