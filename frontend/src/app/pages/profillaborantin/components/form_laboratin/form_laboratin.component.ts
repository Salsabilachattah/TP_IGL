import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartType, registerables } from 'chart.js';
import { FormComponent } from '../../../../components/form/form.component';
import { TableComponent } from '../../../../components/table/table.component';
import { ActivatedRoute } from '@angular/router';
// Enregistrer les composants de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-form_laboratin',
  imports:[FormComponent   ,CommonModule],
  templateUrl: './form_laboratin.component.html',
  styleUrls: ['./form_laboratin.component.css']
})
export class form_laboratinComponent {
  public chart: any; // Référence au graphique
  public fields: string[] = ['glycémie', 'préssion arterielle', 'cholestérol', 'Compte rendu'];
  public fields2: string[] = ['glycémie', 'préssion', 'cholestérol'];
  

  generateGraph(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (this.chart) {
      this.chart.destroy(); // Détruire le graphique précédent
    }

    this.chart = new Chart(ctx, {
      type: 'bar', // Type du graphique (bar, line, pie, etc.)
      data: {
        labels: this.fields2, // Noms des catégories
        datasets: [
          {
            label: 'Mesures',
            data: [70, 85, 60, 90], // Exemple de données
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            enabled: true
          }
        }
      }
    });
  }

  demandeId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve the 'id' query parameter
    this.route.queryParams.subscribe(params => {
      this.demandeId = params['id'];
      console.log('Selected Demande ID:', this.demandeId);
      // Fetch data for the selected demande if needed
    });

}

nom: string = 'Ikram';
prenom: string = 'Doe';
numDossier: string = '123';

}
