import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AffichageinfoComponent } from '../../../../components/affichageinfo/affichageinfo.component';
@Component({
  selector: 'app-ordonnance',
  imports: [CommonModule, FormsModule,AffichageinfoComponent],
  templateUrl: './ordonnance.component.html',
  styleUrl: './ordonnance.component.css',
})
export class OrdonnanceComponent {
  labels: Array<string> = ['medicaments', 'doses', 'durees'];
  added: boolean = false;

  med: string = '';
  dose: string = '';
  duree: string = '';

  constructor (private router: Router){}
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
    //envoyer allData au backend
    alert("sauvegarde faite avec succes !");
    this.router.navigate(['/medecin/resume']);
  }


}
