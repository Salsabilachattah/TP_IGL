import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AffichageinfoComponent } from '../../../../components/affichageinfo/affichageinfo.component'; 
import { MenuComponent } from '../../../../components/menu/menu.component';
import { BouttonretourComponent } from '../../../../components/bouttonretour/bouttonretour.component';

@Component({
  selector: 'app-resume',
  imports: [MenuComponent, BouttonretourComponent, FormsModule, AffichageinfoComponent],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumepatientComponent {
  constructor(private router: Router) {}

  resume: string = 'Voici le résumé de la consultation  : ...'; // Texte statique à afficher


  rowData = {
    numero: '001',
    nom: 'Doe',
    prenom: 'John'
  };

  fieldOrder = ['numero', 'nom', 'prenom'];
}
