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
  infirmier: string;
}

@Component({
  selector: 'app-soins',
  imports: [CommonModule,PlusbuttonComponent,FormComponent,FormsModule],
  templateUrl: './soins.component.html',
  styleUrl: './soins.component.css'
})
export class SoinsComponent {
  added:boolean=false;
  labels: string[]=["Description du soin", "Date","Heure"];
  description: string = '' ;  date: string = '';  hour:string = '' ;
  //backend
  allData: any[] = [
    { description: 'Exemple (suivez ce format)' , date: 'AAAA-MM-JJ', heure: "HH:MM" }, 
    
  ];

  info: boolean = false;
  consultation: boolean = false;
  

  dataKeys: string[] = Object.keys(this.allData[0]);

  itemsPerPage = 8;
  displayedData: any[] = [];

  constructor(private router : Router, private infirmierService : InfirmierService) {
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
  
  

  confirmer(description: string, date: string, hour: string) {
    if (description !== '' && date !== '' && hour !== '' ) {
      this.allData.push({ description: description, date: date, heure: hour });
  
      const dateTime = `${date}T${hour}:00Z`;  
  
      const dataToSend = {
        'description': description,   
        'date_time': dateTime  
      };
  
      this.infirmierService.sendSoin(dataToSend).subscribe({
        next: (response) => {
          this.description = ''; this.date = ''; this.hour = '';
        },
        error: (err) => {
          console.error('Error during saving data:', err);
          alert("Une erreur s'est produite lors de la sauvegarde (vérifiez si les données ont été saisies correctement !)");
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
  alert("Sauvegarde faite avec succes");
}
}

