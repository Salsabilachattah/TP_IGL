import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';
import { FormComponent } from '../../../../components/form/form.component';
import { MenuComponent } from '../../../../components/menu/menu.component';
@Component({
  selector: 'app-creedpi',
  imports: [MenuComponent,CommonModule, FormComponent],
  templateUrl: './creedpi.component.html',
  styleUrl: './creedpi.component.css'
})
export class CreedpiComponent {
  fields: Array<string> = ["Nom", "Prenom","Numéro de sécurité sociale", "Date de naissance" , "Adresse" , "Numéro de téléphone","Mutuelle","Médecin traitant","Personne à contacter"]

}
