import { Component ,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusbuttonComponent } from '../../../../components/plusbutton/plusbutton.component';
import { Router } from '@angular/router';
import { FormComponent } from '../../../profilmedecin/components/form/form.component';
import { FormsModule } from '@angular/forms';

interface Medicament {
  nom: string;
  dose: number;
  date: Date;
  heure: string; 
  infirmier: string;
}


@Component({
  selector: 'app-administration-med',
  imports: [CommonModule,PlusbuttonComponent,FormComponent,FormsModule],
  templateUrl: './administration-med.component.html',
  styleUrl: './administration-med.component.css'
})
export class AdministrationMedComponent {
  added:boolean=false;
  labels: string[]=["Nom du médicament", "Dose", "Date","Heure","Infirmier"];
  med: string = '' ; dose: string = ''; date: string = '';  hour:string = '' ; infirm:string = '';
  //backend
  allData: any[] = [
    { nom: "Paracétamol", dose: '500', date: '2023, 11, 25', heure: "10:00", infirmier: "Dupont" },
    { nom: "Ibuprofène", dose: '400', date: '2023, 11, 25', heure: "15:30", infirmier: "Martin" },
    { nom: "Ibuprofène", dose: '400', date: '2023, 11, 25', heure: "15:30", infirmier: "Martin" },
    { nom: "Ibuprofène", dose: '400', date:'2023, 11, 25', heure: "15:30", infirmier: "Martin" }
  ];

  info: boolean = false;
  consultation: boolean = false;
  

  dataKeys: string[] = Object.keys(this.allData[0]);

  itemsPerPage = 8;
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
      this.consultation = !this.consultation;
      this.info = false;
      this.router.navigate(['/infirmier/soins'])
    }
  }
  
  confirmer(med: string, dose: string, date: string , hour:string , infirm:string) {
    if (this.med !== '' && this.dose !== '' && this.date !== '' && this.hour !== ''&& this.infirm !== '') {
      this.allData.push({ nom: med, dose: dose, date: date , heure: hour , infirmier: infirm});
  

    }
  }

  add() {
    this.added = !this.added;
    console.log('this.added', this.added);
  }


sauvegarder(){
  alert("confirmed");
  //envoyer au back
}
}

