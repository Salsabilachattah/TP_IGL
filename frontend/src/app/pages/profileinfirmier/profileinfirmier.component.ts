import { Component } from '@angular/core';
import { SearchbarComponent } from '../profilmedecin/components/searchbar/searchbar.component';
import { StatsComponent } from '../profilmedecin/components/stats/stats.component';
import { TableauComponent } from './components/tableau/tableau.component';

@Component({
  selector: 'app-profileinfirmier',
  imports: [SearchbarComponent, StatsComponent,TableauComponent],
  templateUrl: './profileinfirmier.component.html',
  styleUrl: './profileinfirmier.component.css'
})
export class ProfileinfirmierComponent {
  fields2 :Array<string> = ["Nom", "Prénom","Plus d'informations","Soins"];
  list :Array<string> = ["Afficher","Commencer"];
}
