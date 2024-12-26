import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../../components/menu/menu.component';
@Component({
  selector: 'app-acceuil-medecin',
  imports: [CommonModule,MenuComponent],
  templateUrl: './acceuil-medecin.component.html',
  styleUrl: './acceuil-medecin.component.css'
})
export class AcceuilMedecinComponent {

}
