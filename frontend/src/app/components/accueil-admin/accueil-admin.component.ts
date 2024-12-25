import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accueil-admin',
  imports: [MenuComponent,CommonModule],
  templateUrl: './accueil-admin.component.html',
  styleUrl: './accueil-admin.component.css'
})
export class AccueilAdminComponent {

}
