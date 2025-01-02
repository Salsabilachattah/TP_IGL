import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfirmierService } from '../../../../services/infirmier.service';

@Component({
  selector: 'app-form',
  imports: [CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
/**Numéro de sécurité sociale
Nom
Prénom
Date de naissance
Adresse
Téléphone
Mutuelle
Médecin
traitant
Personne à contacter
Code QR */
  constructor(private infirmierservice: InfirmierService) {}

@Input() nss : string ='';

dataKeys :string[] =[];
items  : Array<{ [key: string]: any }> =[];

ngOnInit(): void {
  this.infirmierservice.getInfoPatient(this.nss).subscribe({
    next: (data) => {
      this.items = data;
      const excludedKeys = ['created_at', 'updated_at', 'user'];
      this.dataKeys = this.items.length > 0  ? Object.keys(this.items[0]).filter(key => !excludedKeys.includes(key)) : [];
    },
    error: (err) => {
      console.error('Erreur lors de la récupération des données :', err);
    }
  });
}


show:boolean=true;

delete(){
  this.show=false;
}

}
