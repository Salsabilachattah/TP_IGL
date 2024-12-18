import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common'; 
import { DeletebuttonComponent } from '../deletebutton/deletebutton.component';
import { EditbuttonComponent } from '../editbutton/editbutton.component';
import { ShowmorebuttonComponent } from '../showmorebutton/showmorebutton.component';

@Component({
  selector: 'app-table',
  imports :[NgFor,CommonModule,DeletebuttonComponent, EditbuttonComponent ,ShowmorebuttonComponent],
  templateUrl: './table.component.html', 
  styleUrls: ['./table.component.css']  
})
export class TableComponent {
  data = [
    { nom: 'Marmouze', prenom: 'Nor', nss: '123456' },
    { nom: 'Bedjghit', prenom: 'Djinane', nss: '789012' },
    { nom: 'Badaoui', prenom: 'Ikram', nss: '935823' },
    { nom: 'Chattah', prenom: 'Salsabila', nss: '920012' },
    { nom: 'Boukabous', prenom: 'Malak', nss: '233941' },
    { nom: 'Hassam', prenom: 'Amar', nss: '934923' }
  ];
}
