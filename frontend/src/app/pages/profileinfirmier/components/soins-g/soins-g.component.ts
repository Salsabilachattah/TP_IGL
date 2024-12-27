import { Component } from '@angular/core';
import { AdministrationMedComponent } from '../administration-med/administration-med.component';
import { SoinsComponent } from '../soins/soins.component';
import { ObservationsComponent } from '../observations/observations.component';
@Component({
  selector: 'app-soins-g',
  imports: [AdministrationMedComponent,SoinsComponent,ObservationsComponent],
  templateUrl: './soins-g.component.html',
  styleUrl: './soins-g.component.css'
})
export class SoinsGComponent {

}
