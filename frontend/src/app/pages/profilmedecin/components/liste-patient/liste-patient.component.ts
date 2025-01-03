import { Component } from '@angular/core';
import { Tableau2Component } from '../tableau2/tableau2.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { StatsComponent } from '../stats/stats.component';
import { MenuComponent } from '../../../../components/menu/menu.component';
@Component({
  selector: 'app-liste-patient',
  imports: [MenuComponent,Tableau2Component,SearchbarComponent,StatsComponent],
  templateUrl: './liste-patient.component.html',
  styleUrl: './liste-patient.component.css'
})
export class ListePatientComponent {
  fields : Array<string> = ["nom", "prenom","nss","age"];
  fields2 :Array<string> = ["Nom", "Prénom","Dossier du patient","Consultation"];
  list :Array<string> = ["Visualiser","Commencer"];

}
