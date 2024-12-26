import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demandebio',
  imports: [FormsModule],
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

}
