import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusbuttonComponent } from '../../../../components/plusbutton/plusbutton.component';
import { FormComponent } from '../form/form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tableau2',
  imports: [CommonModule, PlusbuttonComponent, FormComponent],
  templateUrl: './tableau2.component.html',
  styleUrls: ['./tableau2.component.css']
})
export class Tableau2Component {
  info: boolean = false;
  dossier: boolean = false;
  consultation: boolean = false;

  @Input() labels: Array<string> = [];
  allData: Array<{ [key: string]: any }> = [
    { nom: 'Marmouze', prenom: 'Nor' },
    { nom: 'Bedjghit', prenom: 'Djinane' },
    { nom: 'Badaoui', prenom: 'Ikram' },
    { nom: 'Chattah', prenom: 'Salsabila' },
    { nom: 'Boukabous', prenom: 'Malak' },
    { nom: 'Hassam', prenom: 'Amar' }
  ];

  

  @Input() buttonsArray: Array<string> = [];

  dataKeys: string[] = Object.keys(this.allData[0]);

  itemsPerPage = 4;
  displayedData: any[] = [];

  constructor(private router : Router) {
    this.displayedData = this.allData.slice(0, this.itemsPerPage);
  }

  loadMore() {
    const currentLength = this.displayedData.length;
    const nextData = this.allData.slice(currentLength, currentLength + this.itemsPerPage);
    this.displayedData = [...this.displayedData, ...nextData];
  }

  display(button: string) {
    if (button === "Afficher") {
      this.info = !this.info;
      this.dossier = false;
      this.consultation = false;
    } else if (button === "Visualiser") {
      this.dossier = !this.dossier;
      this.info = false;
      this.consultation = false;
      this.router.navigate(['/medecin/dossier'])
    
    } else if (button === "Commencer") {
      this.consultation = !this.consultation;
      this.info = false;
      this.dossier = false;
      this.router.navigate(['/medecin/consultation'])
    }
  }
}
