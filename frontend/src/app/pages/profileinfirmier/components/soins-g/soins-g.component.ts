import { Component } from '@angular/core';
import { AdministrationMedComponent } from '../administration-med/administration-med.component';
import { SoinsComponent } from '../soins/soins.component';
import { ObservationsComponent } from '../observations/observations.component';
import { RadioGroupComponent } from '../../../../components/radio-group/radio-group.component';
import { CommonModule } from '@angular/common';
import { AffichageinfoComponent } from '../../../../components/affichageinfo/affichageinfo.component';
import { BouttonretourComponent } from '../../../../components/bouttonretour/bouttonretour.component';
@Component({
  selector: 'app-soins-g',
  imports: [BouttonretourComponent,AffichageinfoComponent,CommonModule,RadioGroupComponent,AdministrationMedComponent,SoinsComponent,ObservationsComponent],
  templateUrl: './soins-g.component.html',
  styleUrl: './soins-g.component.css'
})
export class SoinsGComponent {
  radioOptions = [
    { label: 'Administration des médicaments', value: 'A' },
    { label: 'Soins', value: 'B' },
    { label: 'Observations sur l’état', value: 'C' },
  ];

  selectedOption: string = 'A'; // Option par défaut

  onSelectionChange(value: string): void {
    this.selectedOption = value;
  }
  data = {
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
  };

  fieldOrder = ['name', 'email', 'age'];
}
