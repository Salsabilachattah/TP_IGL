import { Component } from '@angular/core';
import { TableauComponent } from './components/tableau/tableau.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { StatsComponent } from './components/stats/stats.component';
import { Tableau2Component } from './components/tableau2/tableau2.component';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../components/menu/menu.component';
import { AcceuilMedecinComponent } from './components/acceuil-medecin/acceuil-medecin.component';
@Component({
  selector: 'app-profilmedecin',
  imports: [TableauComponent,SearchbarComponent,StatsComponent,Tableau2Component,CommonModule,MenuComponent,AcceuilMedecinComponent],
  templateUrl: './profilmedecin.component.html',
  styleUrl: './profilmedecin.component.css'
})
export class ProfilmedecinComponent {
  fields : Array<string> = ["nom", "prenom","nss","age"];
  fields2 :Array<string> = ["Nom", "Prénom","Plus d'informations","Dossier du patient","Consultation"];
  list :Array<string> = ["Afficher","Visualiser","Commencer"];
}
