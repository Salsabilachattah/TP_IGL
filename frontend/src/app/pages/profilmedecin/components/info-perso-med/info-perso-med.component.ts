import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedecinService } from '../../../../services/medecin.service';

@Component({
  selector: 'app-info-perso-med',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-perso-med.component.html',
  styleUrls: ['./info-perso-med.component.css']
})
export class InfoPersoMedComponent implements OnInit {
  @Input() nss: string = ''; // Reçoit le NSS sous forme de chaîne
  patientData: any; // Pour stocker les données du patient

  itemss: Array<string> = [
    "Numéro de sécurité sociale",
    "Nom",
    "Prénom",
    "Date de naissance",
    "Adresse",
    "Téléphone",
    "Mutuelle",
    "Médecin traitant",
    "Personne à contacter",
  ];

  items: Array<{ [key: string]: any }> = [];
  dataKeys: string[] = [];
  show: boolean = true;

  constructor(private medecinService: MedecinService) {}

  ngOnInit(): void {
    this.fetchPatientData(); // Appel à la méthode pour récupérer les données
  }

  fetchPatientData(): void {
    const nssNumber = Number(this.nss); // Convertir nss en entier
    if (!isNaN(nssNumber)) {
      this.medecinService.getPatientByNss(nssNumber).subscribe(
        (data) => {
          // Exclure les champs non désirés
          const { role, user, updated_at,nss, created_at, ...filteredData } = data;
          this.patientData = filteredData; // Assigner les données filtrées à patientData
          
          // Ajouter le patientData à items
          this.items.push({ "Numéro de sécurité sociale": nssNumber, ...this.patientData });
          this.dataKeys = Object.keys(this.items[0]); // Mettre à jour les clés de données
          console.log("Données du patient:", this.patientData);
        },
        (error) => {
          console.error("Erreur lors de la récupération des données:", error);
        }
      );
    } else {
      console.error("NSS invalide:", this.nss);
    }
  }

  delete() {
    this.show = false;
  }
}
