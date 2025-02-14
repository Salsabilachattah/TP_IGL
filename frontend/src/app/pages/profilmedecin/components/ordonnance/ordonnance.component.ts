import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AffichageinfoComponent } from '../../../../components/affichageinfo/affichageinfo.component';
import { BouttonretourComponent } from '../../../../components/bouttonretour/bouttonretour.component';
import { MenuComponent } from '../../../../components/menu/menu.component';
import { MedecinService } from '../../../../services/medecin.service';
@Component({
  selector: 'app-ordonnance',
  imports: [MenuComponent, BouttonretourComponent,CommonModule, FormsModule,AffichageinfoComponent],
  templateUrl: './ordonnance.component.html',
  styleUrl: './ordonnance.component.css',
})
export class OrdonnanceComponent {
  labels: Array<string> = ['medicaments', 'doses', 'durees'];
  added: boolean = false;

  med: string = '';
  dose: string = '';
  duree: string = '';

  constructor (private router: Router,private medecinService:MedecinService){}
  //backend de ce format

  allData: Array<{ [key: string]: any }> = [
    { medicament: 'Paracétamol', doses: '500mg', duree: '5 jours' },
      { medicament: 'Ibuprofène', doses: '200mg', duree: '3 jours' },
      { medicament: 'Aspirine', doses: '250mg', duree: '7 jours' },
      { medicament: 'Amoxicilline', doses: '1g', duree: '10 jours' },
      { medicament: 'Ciprofloxacine', doses: '500mg', duree: '7 jours' },
      { medicament: 'Oméprazole', doses: '20mg', duree: '14 jours' }
  ];

 
  get dataKeys(): string[] {
    return this.allData.length > 0 ? Object.keys(this.allData[0]) : [];
  }
  ngOnInit() {
    this.rowData = {
      nss: this.medecinService.createdConsultation.patient.nss,
      nom: this.medecinService.createdConsultation.patient.nom,
      prenom: this.medecinService.createdConsultation.patient.prenom
    };
  }
  rowData = {
    nss: '',
    nom: '',
    prenom: '',
  };
  add() {
    this.added = !this.added;
    console.log('this.added', this.added);
  }

  confirmer(med: string, dose: string, duree: string) {
    if (this.med !== '' && this.dose !== '' && this.duree !== '') {
      this.allData.push({ medicament: med, doses: dose, duree: duree });
      this.med = '';
      this.dose = '';
      this.duree = '';
    }
  }


  delete(index: number): void {
    this.allData.splice(index, 1);
  }

  sauvegarder(){
    console.log('this.medecinService.createdConsultation.patient', this.medecinService.createdConsultation);
    this.rowData = {
      numero: this.medecinService.createdConsultation.patient.nss,
      ...this.medecinService.createdConsultation.patient,
    };
    console.log('this.allData', this.allData);
    this.medecinService.saveOrdonnance(this.medecinService.createdConsultation.id,this.allData).subscribe(
      response => {
        console.log('Ordonnance saved successfully', response);
      },
      error => {
        console.error('Error saving ordonnance', error);
      }
    );
   
    this.router.navigate(['/medecin/resume']);

  }
 


  fieldOrder = ['nss', 'nom', 'prenom'];

}