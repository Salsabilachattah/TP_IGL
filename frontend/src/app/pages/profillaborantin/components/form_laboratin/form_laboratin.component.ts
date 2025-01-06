import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartType, registerables } from 'chart.js';
import { FormComponent } from '../form/form.component';
import { TableComponent } from '../../../../components/table/table.component';
import { ActivatedRoute } from '@angular/router';
import { MenuComponent } from '../../../../components/menu/menu.component'; // Enregistrer les composants de Chart.js
import { BouttonretourComponent } from '../../../../components/bouttonretour/bouttonretour.component';
import { BilanService } from '../../../../services/bilan.service';
import { AuthService } from '../../../../services/auth.service';
import { BilanResponse } from '../../../../models/bilan.model';
import { BilanBioTest } from '../../../../models/bilan.model';

Chart.register(...registerables);

@Component({
  selector: 'app-form_laboratin',
  imports:[BouttonretourComponent,MenuComponent, FormComponent   ,CommonModule],
  templateUrl: './form_laboratin.component.html',
  styleUrls: ['./form_laboratin.component.css']
})
export class form_laboratinComponent implements OnInit{
  public chart: any; // Référence au graphique
  public fields2: string[] = ['glycémie avant','glycémie apres', 'préssion arterielle avant','préssion arterielle apres', 'cholestérol avant', 'cholestérol apres'];
  today: Date = new Date();



  bilan: any; // Stockage du bilan unique
nss: string | null = null;
valide: boolean = false; // Par défaut, non traité

 // Variables pour stocker les résultats des tests
 cholestAvant: number | null = null;
 cholestApres: number | null = null;
 ferAvant: number | null = null;
 ferApres: number | null = null;
 hypertAvant: number | null = null;
 hypertApres: number | null = null;

constructor(
  private route: ActivatedRoute,
  private bilanService: BilanService,
  private authService: AuthService,
) {}



ngOnInit(): void {
  // Récupérer les paramètres de l'URL
  this.route.queryParams.subscribe((params) => {
    this.nss = params['id']; // Correspond au nss
    const valideParam = params['valide']; // Récupérer la contrainte valide
    this.valide = valideParam === 'true'; // Convertir en boolean

    if (this.nss) {
      this.loadBilan();
      this.loadLastTwoBilans();
    }
  });
}

// Charger le bilan pour le patient donné
loadBilan(): void {
  this.bilanService.getBilanByNssAndValide(this.nss as string, this.valide).subscribe(
    (response) => {
      this.bilan = response.bilans[0]; // L'API retourne un tableau, mais il n'y aura qu'un élément
         // Vérification de la présence de consultation
         if (!this.bilan || !this.bilan.consultation) {
          console.error('Erreur : Consultation est manquante dans la réponse');
        } else {
          console.log('Consultation ID :', this.bilan.consultation.id);
        }
    },
    
    (error) => {
      console.error('Erreur lors du chargement du bilan :', error);
    }
  );
}


 
// Charger les deux derniers bilans biologiques
loadLastTwoBilans(): void {
  this.bilanService.getBilanByNssAndValide(this.nss as string, true).subscribe(
    (response) => {
      const bilans = response.bilans;

      if (bilans && bilans.length > 0) {
        // Trier les bilans par date décroissante
        bilans.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Vérifier le nombre de bilans disponibles
        if (bilans.length === 1) {
          // S'il n'y a qu'un seul bilan, extraire uniquement les valeurs "Avant"
          this.extractTestValues(bilans[0], null);
          console.warn('Un seul bilan trouvé pour ce patient.');
        } else if (bilans.length >= 2) {
          // Extraire les deux derniers bilans
          const [lastBilan, secondLastBilan] = bilans;
          this.extractTestValues(lastBilan, secondLastBilan);
        }
      } else {
        console.warn('Aucun bilan trouvé pour ce patient.');
      }
    },
    (error) => {
      console.error('Erreur lors de la récupération des bilans biologiques :', error);
    }
  );
}

// Extraire les valeurs des tests des bilans
extractTestValues(lastBilan: any, secondLastBilan: any | null): void {
  const getTestValue = (bilan: any, type: string): number | null => {
    const test = bilan?.tests?.find((t: any) => t.type === type);
    return test ? test.valeur : null;
  };

  // Stocker les valeurs des tests
  if (secondLastBilan) {
    this.cholestAvant = getTestValue(secondLastBilan, 'cholesterol');
    this.ferAvant = getTestValue(secondLastBilan, 'fer');
    this.hypertAvant = getTestValue(secondLastBilan, 'hypertension');
  } else {
    // Si aucun second bilan, les valeurs "Avant" restent null
    this.cholestAvant = null;
    this.ferAvant = null;
    this.hypertAvant = null;
  }

  this.cholestApres = getTestValue(lastBilan, 'cholesterol');
  this.ferApres = getTestValue(lastBilan, 'fer');
  this.hypertApres = getTestValue(lastBilan, 'hypertension');
}



onFormSubmit(formData: { [key: string]: string }): void {
  // Mettre à jour les données du bilan localement
  console.log('Consultation:', this.bilan.consultation);  // Affiche toute la consultation
  console.log('bilan:', this.bilan);  // Affiche toute la consultation

  this.bilan.resultat = formData['Résultat'] || '';
  this.bilan.valide = true; // Marquer comme traité

  
  // Envoyer les données mises à jour au serveur en utilisant l'ID du bilan
  this.bilanService.updateBilan(this.bilan.consultation, this.bilan).subscribe(
    (response) => {
      console.log('Bilan mis à jour avec succès:', response);
      alert('Les informations ont été enregistrées avec succès.');
    },
    (error) => {
      console.error('Erreur lors de la mise à jour du bilan:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  );
}



//**deuxieme formulair pour les donnees du graph */
onFormSubmit2(formData: { [key: string]: string | number }): void {
  // Log form data
  console.log('Form Data:', formData);

  const bilanBioId = this.bilan.consultation;

  const testTypes = [
    { type: 'cholesterol', label: 'Cholestérol' },
    { type: 'fer', label: 'Fer tests' },
    { type: 'hypertension', label: 'Hypertension' },
  ];

  testTypes.forEach((test) => {
    const valeur = formData[test.label];
    
    // Convert the value to a number before sending it
    const valeurAsNumber = typeof valeur === 'string' ? parseFloat(valeur) : valeur;

    if (valeurAsNumber !== undefined && valeurAsNumber !== null) {
      const requestPayload = { type: test.type, valeur: valeurAsNumber };

      // Log the request payload being sent
      console.log('Sending request with payload:', requestPayload); // Log the request payload

      this.bilanService.addBilanBioTest(bilanBioId, requestPayload).subscribe({
        next: (response) => {
          console.log(`Test ${test.type} ajouté avec succès:`, response);
        },
        error: (err) => {
          // Log the error response from the backend
          console.error(`Erreur lors de l'ajout du test ${test.type}:`, err);
          if (err.error) {
            console.error('Error response body:', err.error); // Log the body of the error response
          }
        },
      });
    } else {
      console.warn(`Valeur manquante pour ${test.label}`);
    }
  });
}
generateGraph(): void {
  const ctx = document.getElementById('myChart') as HTMLCanvasElement;

  // Adjust the canvas dimensions to reduce the chart size
  ctx.width = 600; // Desired width
  ctx.height = 400; // Desired height

  // Destroy the chart if it already exists
  if (this.chart) {
    this.chart.destroy();
  }

  // Define the labels for the x-axis (e.g., Cholestérol, Fer, Hypertension)
  const labels = ['Cholestérol', 'Fer', 'Hypertension'];

  // Prepare the "Avant" dataset
  const datasets = [];

  // If "Avant" data exists (not null), add it to the dataset
  if (
    this.cholestAvant !== null ||
    this.ferAvant !== null ||
    this.hypertAvant !== null
  ) {
    datasets.push({
      label: 'Avant',
      data: [
        this.cholestAvant, 
        this.ferAvant, 
        this.hypertAvant
      ], // Data for "Avant"
      backgroundColor: '#FFB6C1', // Soft red for "Avant"
    });
  }

  // If "Après" data exists (not null), add it to the dataset, but remove the label
  if (
    this.cholestApres !== null ||
    this.ferApres !== null ||
    this.hypertApres !== null
  ) {
    datasets.push({
      label: '',  // Empty label to hide the label
      data: [
        this.cholestApres, 
        this.ferApres, 
        this.hypertApres,
      ], // Data for "Après"
      backgroundColor: '#ADD8E6', // Soft blue for "Après"
    });
  }

  // If both are null, display only the values without a label (fallback case)
  if (datasets.length === 0) {
    datasets.push({
      label: 'Valeurs',
      data: [
        this.cholestAvant || this.cholestApres,
        this.ferAvant || this.ferApres,
        this.hypertAvant || this.hypertApres,
      ], // Use whichever value is available
      backgroundColor: '#ADD8E6', // Default color
    });
  }

  // Create the chart
  this.chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels, // X-axis labels (group names)
      datasets: datasets, // Dynamically generated datasets
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Tests',
          },
          stacked: false, // Bars grouped side by side
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Valeurs (g/L)',
          },
        },
      },
    },
  });
}




}