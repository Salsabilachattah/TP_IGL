import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AffichageinfoComponent } from '../../../../components/affichageinfo/affichageinfo.component';
import { BouttonretourComponent } from '../../../../components/bouttonretour/bouttonretour.component';
import { MenuComponent } from '../../../../components/menu/menu.component';
import { MedecinService } from '../../../../services/medecin.service';
@Component({
  selector: 'app-demandebio',
  imports: [MenuComponent,BouttonretourComponent,FormsModule,AffichageinfoComponent],
  templateUrl: './demandebio.component.html',
  styleUrl: './demandebio.component.css'
})
export class DemandebioComponent {
  bilanBio :string ='';
  constructor(private router: Router,private medecinService:MedecinService){};
  save(){
    //envoyer au backend
    if(this.bilanBio !=''){
      this.medecinService
        .createBilanBioConsultation(
          this.medecinService.createdConsultation.id,
          this.bilanBio
        )
        .subscribe((consultation) => {
          alert('Bilan sauvegardé avec succés !'); 
          console.log(consultation); // This will log the consultation after the HTTP request completes
          console.log(this.medecinService.createdConsultation); // Now, this will show the updated value
          this.bilanBio = '';
          this.router.navigate(['/medecin/bilans']);
        });
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
