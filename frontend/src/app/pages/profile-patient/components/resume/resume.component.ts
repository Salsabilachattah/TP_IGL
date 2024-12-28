import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AffichageinfoComponent } from '../../../../components/affichageinfo/affichageinfo.component'; 
import { MenuComponent } from '../../../../components/menu/menu.component';
import { BouttonretourComponent } from '../../../../components/bouttonretour/bouttonretour.component';

@Component({
  selector: 'app-resume',
  imports: [MenuComponent,BouttonretourComponent,FormsModule,AffichageinfoComponent],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {
  constructor (private router : Router ){};
  resume :string ='';
  save(){
    //envoyer au backend
    if(this.resume !=''){
      alert("Résumé sauvegardé avec succés !"); 
      this.resume='';
      this.router.navigate(['/medecin/patients'])
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
