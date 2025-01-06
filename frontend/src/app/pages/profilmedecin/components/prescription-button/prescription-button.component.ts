import { Component ,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Medicament {
  medicament: string; // Assurez-vous que le nom de la propriété soit correct
  dose: string;
  duree: string;
}
@Component({
  selector: 'app-prescription-button',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './prescription-button.component.html',
  styleUrl: './prescription-button.component.css'
})
export class prescriptionButtonComponent {
   @Input() medicaments: Medicament[] = []; // Utilisez le type 'Medicament'

  show: boolean = true;

  deletepres() {
    this.show = false;
  }
}
