import { Component } from '@angular/core';
import { FormComponent } from '../../../../components/form/form.component';
import { InformationPersoComponent } from '../../../../components/information-perso/information-perso.component';
import { MenuComponent } from '../../../../components/menu/menu.component';
@Component({
  selector: 'app-info-perso',
  imports: [MenuComponent, FormComponent , InformationPersoComponent],
  templateUrl: './info-perso.component.html',
  styleUrl: './info-perso.component.css'
})
export class InfoPersoComponent {
  labels = ['Nom', 'Prénom', 'Téléphone'];
  formData: { [key: string]: string } = {
    'Nom': 'Dupont',
    'Prénom': 'Jean',
    'Téléphone': '0123456789'
  };
}
