import { Component, Input } from '@angular/core';
import { Tableau2Component } from '../tableau2/tableau2.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { StatsComponent } from '../stats/stats.component';
import { MenuComponent } from '../../../../components/menu/menu.component';
import { CommonModule } from '@angular/common';
import { MedecinService } from '../../../../services/medecin.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-liste-patient',
  imports: [
    MenuComponent,
    Tableau2Component,
    SearchbarComponent,
    StatsComponent,
    CommonModule,
  ],
  templateUrl: './liste-patient.component.html',
  styleUrl: './liste-patient.component.css',
})
export class ListePatientComponent {
  fields: Array<string> = ['nom', 'prenom', 'nss', 'age'];
  fields2: Array<string> = [
    'NSS',
    'Nom',
    'Prénom',
    'Dossier du patient',
    'Consultation',
  ];
  list: Array<string> = ['Visualiser', 'Commencer'];
  searched: boolean = false;

  receivedData: string = '';

  handleData(data: string) {
    this.receivedData = data; // Update the bound property
    console.log('Data received from child:', data);
    
  }
  //@Input() searched: boolean = false; 
  
 // constructor() {console.log("searched avant", this.searched); this.searched = localStorage.getItem('searched') === 'true';  console.log("searched apres", this.searched)}
}
