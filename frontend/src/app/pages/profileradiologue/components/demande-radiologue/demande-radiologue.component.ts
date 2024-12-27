import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { form_laboratinComponent } from '../../../profillaborantin/components/form_laboratin/form_laboratin.component';
@Component({
  selector: 'app-demande-radiologue',
  imports: [CommonModule,  RouterModule , form_laboratinComponent],
  templateUrl: './demande-radiologue.component.html',
  styleUrl: './demande-radiologue.component.css'
})
export class DemandeRadiologueComponent {
  activeTab: string = 'nonTreated'; // Default tab

  // Sample data for demonstration
  nonTreatedDemandes = [
    { id:'1',name: 'Bediat Djiane', date: '30-10-2024', description: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum Lorem ipsum lorem ipsum lorem ipsum lorem ipsumLorem ipsum lorem ipsum lorem ipsum lorem ipsum.' },
    {id:'2', name: 'Bediat Djiane', date: '30-10-2024', description: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum.Lorem ipsum lorem ipsum lorem ipsum lorem ipsumLorem ipsum lorem ipsum lorem ipsum lorem ipsum' },
    { id:'3',name: 'Bediat Djiane', date: '30-10-2024', description: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum.Lorem ipsum lorem ipsum lorem ipsum lorem ipsumLorem ipsum lorem ipsum lorem ipsum lorem ipsum' },
    ];

  treatedDemandes = [
    { id:'4',name: 'Bediat Djiane', date: '30-10-2024', description: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum',compteRendu: 'Lorem ipsum lorem ipsum lorem', medcin:'Dr. ikram',by: 'Dr. John Doe', image: 'path_to_image_1.jpg' },
    { id:'5',name: 'Bediat Djiane', date: '30-10-2024',description: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum', compteRendu: 'Lorem ipsum lorem ipsum lorem',medcin:'Dr. noor', by: 'Dr. Jane Smith', image: 'path_to_image_2.jpg' },
    { id:'6',name: 'Bediat Djiane', date: '30-10-2024', description: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum',compteRendu: 'Lorem ipsum lorem ipsum lorem', medcin:'Dr. salso',by: 'Dr. Emily Brown', image: 'path_to_image_3.jpg' },
     ];

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
