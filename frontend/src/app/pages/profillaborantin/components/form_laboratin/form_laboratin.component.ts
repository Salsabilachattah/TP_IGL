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
Chart.register(...registerables);
interface BilanResponse {
  bilans: Array<{ 
    id: number; 
    date_debut: string;
    tests: Array<{
      type: string;
      valeur: number;
    }>;
  }>;
}
@Component({
  selector: 'app-form_laboratin',
  imports:[BouttonretourComponent,MenuComponent, FormComponent   ,CommonModule],
  templateUrl: './form_laboratin.component.html',
  styleUrls: ['./form_laboratin.component.css']
})
export class form_laboratinComponent implements OnInit{
  public chart: any; // Référence au graphique
  public fields2: string[] = ['glycémie avant','glycémie apres', 'préssion arterielle avant','préssion arterielle apres', 'cholestérol avant', 'cholestérol apres'];


  bilan: any; // Stockage du bilan unique
nss: string | null = null;
valide: boolean = false; // Par défaut, non traité

constructor(
  private route: ActivatedRoute,
  private bilanService: BilanService,
  private authService: AuthService,
  private http: HttpClient
) {}



ngOnInit(): void {
  // Récupérer les paramètres de l'URL
  this.route.queryParams.subscribe((params) => {
    this.nss = params['id']; // Correspond au nss
    const valideParam = params['valide']; // Récupérer la contrainte valide
    this.valide = valideParam === 'true'; // Convertir en boolean

    if (this.nss) {
      this.loadBilan();
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
  ctx.width = 600;  // Desired width
  ctx.height = 400; // Desired height

  // Make sure to check if the chart already exists and destroy it before creating a new one
  if (this.chart) {
    this.chart.destroy();
  }

  const nss = this.bilan?.patient?.nss;  // Get the NSS dynamically

  if (!nss) {
    console.error("NSS not found!");
    return;
  }

  // Use HttpClient to make the GET request
this.http.get<BilanResponse>(`http://localhost:8080/api/patients/${nss}/bilanbio/lasttwo/`)
    .subscribe(response => {
      const bilans = response.bilans;

      const labels: string[] = []; // Explicitly define the type of labels as string[]
      const glycemyData: number[] = []; // Explicitly define the type of glycemyData as number[]
      const pressureData: number[] = []; // Explicitly define the type of pressureData as number[]
      const cholesterolData: number[] = []; // Explicitly define the type of cholesterolData as number[]

      bilans.forEach(bilan => {
        bilan.tests.forEach(test => {
          labels.push(test.type);  // labels are strings
          if (test.type === 'Glycémie') glycemyData.push(test.valeur);
          if (test.type === 'Pression artérielle') pressureData.push(test.valeur);
          if (test.type === 'Cholestérol') cholesterolData.push(test.valeur);
        });
      });

      // Now create the chart
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Glycémie',
              data: glycemyData,
              backgroundColor: '#FF7F7F',
            },
            {
              label: 'Pression artérielle',
              data: pressureData,
              backgroundColor: '#7FBFFF',
            },
            {
              label: 'Cholestérol',
              data: cholesterolData,
              backgroundColor: '#FFBF7F',
            }
          ]
        },
        options: {
          responsive: false,
          plugins: {
            legend: {
              display: true
            },
            tooltip: {
              enabled: true
            }
          },
          scales: {
            x: {
              ticks: {
                maxRotation: 45,
                minRotation: 0
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'g/L'
              }
            }
          }
        }
      });
    });
}



}