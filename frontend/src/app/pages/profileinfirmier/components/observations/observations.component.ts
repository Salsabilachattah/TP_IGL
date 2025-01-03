import { Component ,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusbuttonComponent } from '../../../../components/plusbutton/plusbutton.component';
import { Router } from '@angular/router';
import { FormComponent } from '../../../profilmedecin/components/form/form.component';
import { FormsModule } from '@angular/forms';
import { InfirmierService } from '../../../../services/infirmier.service';

interface nomicament {
  nom: string;
  dose: number;
  date: Date;
  heure: string; 
}

@Component({
  selector: 'app-observations',
  imports: [CommonModule,PlusbuttonComponent,FormComponent,FormsModule],
  templateUrl: './observations.component.html',
  styleUrl: './observations.component.css'
})

export class ObservationsComponent {
  added:boolean=false;
  labels: string[]=["Observations sur l'état", "Date","Heure"];
  observation: string = '' ;  date: string = '';  hour:string = '' ;
  //backend
  allData: any[] = [
    { observation: 'exemple (Suivez ce format)' , date: 'AAAA-MM-JJ', heure: "HH:MM"},
  ];

  info: boolean = false;
  consultation: boolean = false;
  

  dataKeys: string[] = Object.keys(this.allData[0]);

  itemsPerPage = 8;
  displayedData: any[] = [];

  constructor(private router : Router , private infirmierService : InfirmierService) {
    this.displayedData = this.allData.slice(0, this.itemsPerPage);
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
  
  confirmer(observation: string, date: string , hour:string ) {
    if (this.observation !== '' && this.date !== '' && this.hour !== '') {
      this.allData.push({ observation: observation,  date: date , heure: hour });
      const dateTime = `${date}T${hour}:00Z`;
      const dataToSend = {
        'observation': observation, 
        'infirmier': 3, 
        'date_time': dateTime 
      };
    
      this.infirmierService.sendEtat(dataToSend).subscribe({
        next: (response) => {
          this.observation = '' ; ; this.date = '' ; this.hour = '';
        },
        error: (err) => {
          alert("Une erreur s'est produite lors de la sauvegarde ( verifiez le format des données saisies ).");
        }
      });
      const currentLength = this.displayedData.length;
      const nextData = this.allData.slice(currentLength, currentLength + this.itemsPerPage);
      this.displayedData = [...this.displayedData, ...nextData];
    }
  } 

  add() {
    this.added = !this.added;
  }


sauvegarder(){
  alert("Les données ont été sauvegardées avec succès !");
}
}

