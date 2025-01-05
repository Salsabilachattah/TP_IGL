import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AffichageinfoComponent } from '../../../../components/affichageinfo/affichageinfo.component';
import { BouttonretourComponent } from '../../../../components/bouttonretour/bouttonretour.component';
import { MenuComponent } from '../../../../components/menu/menu.component';
import { FormsModule } from '@angular/forms';
import { MedecinService } from '../../../../services/medecin.service';
@Component({
  selector: 'app-rediger-resume',
  imports: [AffichageinfoComponent,BouttonretourComponent,MenuComponent,FormsModule],
  templateUrl: './rediger-resume.component.html',
  styleUrl: './rediger-resume.component.css'
})
export class RedigerResumeComponent {
  resume :string ='';
  constructor (private router: Router,private medecinService:MedecinService){}
  save(){
    //envoyer au backend
    if(this.resume !=''){
      this.medecinService
        .redigerResume(
          this.medecinService.createdConsultation.id,
          this.resume
        )
        .subscribe((resume) => {
          alert('Resumé sauvegardé avec succés !');
          console.log(resume); // This will log the consultation after the HTTP request completes
          this.medecinService.createdConsultation={}; // Now, this will show the updated value
          this.resume = '';
          this.router.navigate(['/medecin']);
        });

    }else{
      alert("Remplissez d'abord!")
    }
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