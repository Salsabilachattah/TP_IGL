import { Component ,Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { prescriptionButtonComponent } from '../prescription-button/prescription-button.component'; 
import { AuthService } from '../../../../services/auth.service';
import { MedecinService } from '../../../../services/medecin.service';

interface Medicament {
  medicament: string;
  dose: string;
  duree: string;
}

interface Ordonnance {
  date: string;
  medicaments: Medicament[];
  show: boolean;
} 
@Component({
  selector: 'app-prescription',
  standalone:true,
  imports:[CommonModule , prescriptionButtonComponent],
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css'],
})
export class PrescriptionComponent {
  @Input() nss: string | number | null = null;

  prescription: Ordonnance[] = [];

  constructor(
    private medecinservice: MedecinService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit: Initialisation du composant PrescriptionComponent');
    this.initializeNss();
  }

  private initializeNss(): void {
    console.log('initializeNss: NSS récupéré =', this.nss);

    if (this.nss) {
      this.fetchOrdonnances();
    } else {
      console.error('initializeNss: NSS introuvable pour le patient connecté.');
    }
  }

  fetchOrdonnances(): void {
    console.log('fetchOrdonnances: Tentative de récupération des ordonnances...');
    if (!this.nss) {
      console.error('fetchOrdonnances: NSS non disponible. Impossible de récupérer les ordonnances.');
      return;
    }
    const nssString = this.nss.toString().replace(/,/g, '').trim(); // Convertir nss en chaîne de caractères
this.nss=Number(nssString) ;
    this.medecinservice.getOrdonnancesByNss(this.nss).subscribe({
      next: (data) => {
        console.log('fetchOrdonnances: Réponse de l\'API reçue =', data);
        this.prescription = data.map((ordonnance: any) => ({
          date: ordonnance.created_at || 'Date inconnue',
          medicaments: ordonnance.medicaments || [],
          show: false,
        }));
        console.log('fetchOrdonnances: Prescription mise à jour =', this.prescription);
      },
      error: (err) => {
        console.error('fetchOrdonnances: Erreur lors de la récupération des ordonnances :', err);
      },
    });
  }
  
  toggleContenu(index: number): void {
    console.log(`toggleContenu: Toggle de l'état show pour l'indice ${index}`);
    this.prescription[index].show = !this.prescription[index].show;
    console.log(`toggleContenu: Nouvelle valeur de show = ${this.prescription[index].show}`);
  }

  displayContenu(index: number): void {
    console.log(`displayContenu: Affichage du contenu pour l'indice ${index}`);
    this.prescription[index].show = true;
    console.log(`displayContenu: Nouvelle valeur de show = ${this.prescription[index].show}`);
  }

  hideContenu(index: number): void {
    console.log(`hideContenu: Masquage du contenu pour l'indice ${index}`);
    this.prescription[index].show = false;
    console.log(`hideContenu: Nouvelle valeur de show = ${this.prescription[index].show}`);
  }
}