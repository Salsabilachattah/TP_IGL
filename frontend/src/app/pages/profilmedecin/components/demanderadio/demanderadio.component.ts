import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AffichageinfoComponent } from '../../../../components/affichageinfo/affichageinfo.component';
import { BouttonretourComponent } from '../../../../components/bouttonretour/bouttonretour.component';
import { MenuComponent } from '../../../../components/menu/menu.component';
import { MedecinService } from '../../../../services/medecin.service';

@Component({
  selector: 'app-demanderadio',
  imports: [
    MenuComponent,
    BouttonretourComponent,
    FormsModule,
    AffichageinfoComponent,
  ],
  templateUrl: './demanderadio.component.html',
  styleUrl: './demanderadio.component.css',
})
export class DemanderadioComponent {
  bilanRadio: string = '';
  constructor(private router: Router,private medecinService:MedecinService) {}
  save() {
    //envoyer au backend
    if (this.bilanRadio != '') {
      console.log(this.medecinService.createdConsultation);

      this.medecinService
        .createBilanRadioConsultation(
          this.medecinService.createdConsultation.id,
          this.bilanRadio
        )
        .subscribe((bilan) => {
          alert('Bilan sauvegardé avec succés !');
          console.log(bilan); // This will log the consultation after the HTTP request completes
          console.log(this.medecinService.createdConsultation); // Now, this will show the updated value
          this.bilanRadio = '';
          this.router.navigate(['/medecin/bilans']);
        });
    } else {
      alert("Remplissez d'abord!");
    }
  }

  rowData = {
    numero: '001',
    nom: 'Doe',
    prenom: 'John',
  };

  fieldOrder = ['numero', 'nom', 'prenom'];
}
