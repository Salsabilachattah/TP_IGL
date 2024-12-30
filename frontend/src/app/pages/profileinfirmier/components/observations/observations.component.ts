import { Component ,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusbuttonComponent } from '../../../../components/plusbutton/plusbutton.component';
import { Router } from '@angular/router';
import { FormComponent } from '../../../profilmedecin/components/form/form.component';
import { FormsModule } from '@angular/forms';

interface nomicament {
  nom: string;
  dose: number;
  date: Date;
  heure: string; 
  infirmier: string;
}

@Component({
  selector: 'app-observations',
  imports: [CommonModule,PlusbuttonComponent,FormComponent,FormsModule],
  templateUrl: './observations.component.html',
  styleUrl: './observations.component.css'
})

export class ObservationsComponent {
  added:boolean=false;
  labels: string[]=["Observations sur l'état", "Date","Heure","Infirmier"];
  nom: string = '' ;  date: string = '';  hour:string = '' ; infirm:string = '';
  //backend
  allData: any[] = [
    { nom: 'bien' , date: '2023, 11, 25', heure: "10:00", infirmier: "Dupont" },
    { nom: "fievre", date: '2023, 11, 25', heure: "15:30", infirmier: "Martin" },
    { nom: "fatigué", date: '2023, 11, 25', heure: "15:30", infirmier: "Martin" },
    { nom: "grave", date:'2023, 11, 25', heure: "15:30", infirmier: "Martin" }
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
  
  confirmer(nom: string, date: string , hour:string , infirm:string) {
    if (this.nom !== '' && this.date !== '' && this.hour !== ''&& this.infirm !== '') {
      this.allData.push({ nom: nom,  date: date , heure: hour , infirmier: infirm});
  

    }
  }

  add() {
    this.added = !this.added;
    console.log('this.added', this.added);
  }


sauvegarder(){
  alert("confirnom");
  //envoyer au back
}
}

