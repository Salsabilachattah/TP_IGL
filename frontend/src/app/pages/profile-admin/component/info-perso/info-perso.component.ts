import { Component } from '@angular/core';
import { FormComponent } from '../../../../components/form/form.component';
@Component({
  selector: 'app-info-perso',
  imports: [FormComponent],
  templateUrl: './info-perso.component.html',
  styleUrl: './info-perso.component.css'
})
export class InfoPersoComponent {
  fields: Array<string> = ["Nom", "Prenom","Numéro de téléphone"]

}
