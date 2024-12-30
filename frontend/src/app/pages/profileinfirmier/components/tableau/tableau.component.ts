import { Component ,Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusbuttonComponent } from '../../../../components/plusbutton/plusbutton.component';
import { Router } from '@angular/router';
import { FormComponent } from '../../../profilmedecin/components/form/form.component';
@Component({
  selector: 'app-tableau',
  imports: [CommonModule,PlusbuttonComponent,FormComponent],
  templateUrl: './tableau.component.html',
  styleUrl: './tableau.component.css'
})
export class TableauComponent {
  info: boolean = false;
  consultation: boolean = false;

  @Input() labels: Array<string> = [];
  //normalement input
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
  
    } else if (button === "Commencer") {
      console.log("Bouton Commencer cliqué"); // Ajoutez ce log
      this.consultation = !this.consultation;
      this.info = false;
      this.router.navigate(['/infirmier/soins']);
    }
  }
  
}



