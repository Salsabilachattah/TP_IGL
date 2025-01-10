import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusbuttonComponent } from '../../../../components/plusbutton/plusbutton.component';
import { Router } from '@angular/router';
import { FormComponent } from '../../../profilmedecin/components/form/form.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfirmierService } from '../../../../services/infirmier.service';

interface Medicament {
  [key: string]: string | number | Date;
  nom: string;
  dose: number;
  date: string;
  heure: string;
}


@Component({
  selector: 'app-administration-med',
  imports: [CommonModule, PlusbuttonComponent, FormComponent, FormsModule],
  templateUrl: './administration-med.component.html',
  styleUrl: './administration-med.component.css'
})
@Injectable({
  providedIn: 'root'
})
export class AdministrationMedComponent {


  added: boolean = false;
  labels: string[] = ["Nom du médicament", "Dose", "Date", "Heure"];
  med: string = '';
  dose: string = '';
  date: string = '';
  hour: string = '';


  allData: Medicament[] = [
    { nom: "exemple(suivez le format)", dose: 500, date: 'AAAA-MM-JJ', heure: "HH:MM" ,},
  ];
  dataKeys: string[] = Object.keys(this.allData[0]);

  Data : Medicament[]=[];
  info: boolean = false;
  consultation: boolean = false;

  itemsPerPage = 8;
  displayedData: Medicament[] = [];

  constructor(private router: Router, private http: HttpClient , private infirmierService : InfirmierService) { 
    this.displayedData = this.allData.slice(0, this.itemsPerPage);
  }
/*
  loadMore() {
    const currentLength = this.displayedData.length;
    const nextData = this.allData.slice(currentLength, currentLength + this.itemsPerPage);
    this.displayedData = [...this.displayedData, ...nextData];
  }
*/
  display(button: string) {
    if (button === "Afficher") {
      this.info = !this.info;
    } else if (button === "Commencer") {
      this.consultation = !this.consultation;
      this.info = false;
      this.router.navigate(['/infirmier/soins']);
    }
  }

  confirmer(med: string, dose: string, date: string, hour: string) {
    if (this.med !== '' && this.dose !== '' && this.date !== '' && this.hour !== '' ) {
      const dateTime = `${date}T${hour}:00Z`;
      this.allData.push({ nom: med, dose: parseFloat(dose), date: date, heure: hour});
      const dataToSend = {
        'medicament': med, 
        'dose': dose,
        'date_time': dateTime 
      };
    
      this.infirmierService.sendData(dataToSend).subscribe({
        next: (response) => {
          this.med = '' ; this.dose = '' ; this.date = '' ; this.hour = '';
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

sauvegarder() {
  alert("Opération terminée avec succès !")
}



}









