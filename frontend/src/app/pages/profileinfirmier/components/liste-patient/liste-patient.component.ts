import { Component } from '@angular/core';
import { TableauComponent } from '../tableau/tableau.component';
import { SearchbarComponent } from '../../../profilmedecin/components/searchbar/searchbar.component';
import { StatsComponent } from '../../../profilmedecin/components/stats/stats.component';
@Component({
  selector: 'app-liste-patient',
  imports: [StatsComponent,SearchbarComponent,TableauComponent],
  templateUrl: './liste-patient.component.html',
  styleUrl: './liste-patient.component.css'
})
export class ListePatientComponent {
  fields2 :Array<string> = ["Nom", "Prénom","Plus d'informations","Soins"];
  list :Array<string> = ["Afficher","Commencer"];

}
