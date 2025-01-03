import { Component } from '@angular/core';
import { AdministrationMedComponent } from '../administration-med/administration-med.component';
import { SoinsComponent } from '../soins/soins.component';
import { ObservationsComponent } from '../observations/observations.component';
import { RadioGroupComponent } from '../../../../components/radio-group/radio-group.component';
import { CommonModule } from '@angular/common';
import { AffichageinfoComponent } from '../../../../components/affichageinfo/affichageinfo.component';
import { BouttonretourComponent } from '../../../../components/bouttonretour/bouttonretour.component';
import { MenuComponent } from '../../../../components/menu/menu.component';
import { ActivatedRoute } from '@angular/router';

import { InfirmierService } from '../../../../services/infirmier.service';

@Component({
  selector: 'app-soins-g',

  imports: [MenuComponent,BouttonretourComponent,AffichageinfoComponent,CommonModule,RadioGroupComponent,AdministrationMedComponent,SoinsComponent,ObservationsComponent],
  templateUrl: './soins-g.component.html',
  styleUrl: './soins-g.component.css'
})
export class SoinsGComponent {
 

  radioOptions = [
    { label: 'Administration des médicaments', value: 'A' },
    { label: 'Soins', value: 'B' },
    { label: 'Observations sur l’état', value: 'C' },
  ];

  idpatient: string  | null = null;
  dataKeys :string[] =[];
  data  : Array<{ [key: string]: any }> =[];

  constructor(private route: ActivatedRoute,private infirmierservice: InfirmierService){}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('idpatient');
    this.idpatient = id ? id : ''; 
    this.infirmierservice.getInfoPatient(this.idpatient).subscribe({
      next: (data) => {
        this.data = data;
        const includedKeys = ['nom', 'prenom', 'nss'];
        this.dataKeys = this.data.length > 0  ? Object.keys(this.data[0]).filter(key => includedKeys.includes(key)) : [];
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });

  }
  selectedOption: string = 'A'; // Option par défaut

  onSelectionChange(value: string): void {
    this.selectedOption = value;
  }

  /*
  data = {
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
  };

  fieldOrder = ['name', 'email', 'age'];*/
//from the backend get nom prenom nss
fieldOrder = ['nom', 'prenom', 'nss'];



}
