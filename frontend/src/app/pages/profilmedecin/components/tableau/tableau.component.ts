import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tableau',
  imports: [CommonModule],
  templateUrl: './tableau.component.html',
  styleUrl: './tableau.component.css'
})
export class TableauComponent {
  @Input() labels :Array <String> =[];

  //du backend je vais avoir une donnee sous la forme: 
  //
  allData : Array<{ [key: string]: any }> = [
    { nom: 'Marmouze', prenom: 'Nor', nss: '123456' , age:'10' },
    { nom: 'Bedjghit', prenom: 'Djinane', nss: '789012' , age:'10' },
    { nom: 'Badaoui', prenom: 'Ikram', nss: '935823' , age:'10' },
    { nom: 'Chattah', prenom: 'Salsabila', nss: '920012' , age:'10' },
    { nom: 'Boukabous', prenom: 'Malak', nss: '233941' , age:'10' },
    { nom: 'Hassam', prenom: 'Amar', nss: '934923' , age:'10' }
  ];

  dataKeys :string[] = Object.keys(this.allData[0]);
  
}
