import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';
import { FormComponent } from '../../../../components/form/form.component';
@Component({
  selector: 'app-creedpi',
  imports: [CommonModule, FormComponent],
  templateUrl: './creedpi.component.html',
  styleUrl: './creedpi.component.css'
})
export class CreedpiComponent {
  fields: Array<string> = ["Nom", "Prenom","Numéro de sécurité sociale", "Date de naissance" , "Adresse" , "Numéro de téléphone","Mutuelle","Médecin traitant","Personne à contacter"]

}
