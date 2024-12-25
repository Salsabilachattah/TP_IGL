import { Component } from '@angular/core';
import { TableauComponent } from './components/tableau/tableau.component';
@Component({
  selector: 'app-profilmedecin',
  imports: [TableauComponent],
  templateUrl: './profilmedecin.component.html',
  styleUrl: './profilmedecin.component.css'
})
export class ProfilmedecinComponent {
  fields : Array<String> = ["nom", "prenom","nss","age"];
}
