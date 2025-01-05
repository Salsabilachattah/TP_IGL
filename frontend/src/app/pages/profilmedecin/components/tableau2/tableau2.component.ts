import { Component, Input , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusbuttonComponent } from '../../../../components/plusbutton/plusbutton.component';
import { FormComponent } from '../form/form.component';
import { Router } from '@angular/router';
import { MedecinService } from '../../../../services/medecin.service';

@Component({
  selector: 'app-tableau2',
  imports: [CommonModule, PlusbuttonComponent, FormComponent],
  templateUrl: './tableau2.component.html',
  styleUrls: ['./tableau2.component.css']
})
export class Tableau2Component implements OnInit {
  info: boolean = false;
  dossier: boolean = false;
  consultation: boolean = false;

  @Input() labels: Array<string> = [];
  @Input() allData: Array<{ [key: string]: any }> = [];

  patients: any[] = [];
  dataKeys: string[] = [];
  itemsPerPage = 10000;
  displayedData: any[] = [];
  selectedPatientId: number | null = null;

  constructor(private router: Router, private medecinService: MedecinService) {
    this.updatePatientDetails = this.updatePatientDetails.bind(this);
  }

  

  ngOnInit(): void {
    this.medecinService.getListePatients().subscribe((data: any[]) => {
      this.allData = data;
      this.patients = data.map(patient => {
        const keys = Object.keys(patient);
        return {
          [keys[1]]: patient[keys[0]],
          [keys[2]]: patient[keys[2]],
          [keys[3]]: patient[keys[3]]
        };
      });
      console.log('Patients data:', this.patients); // Debugging line to check data
      if (this.patients.length > 0) {
        this.dataKeys = Object.keys(this.patients[0]);
        this.displayedData = this.patients.slice(0, this.itemsPerPage);
      }
    });
  }

  updatePatientDetails(patient: any): void {
    this.selectedPatientId = patient.id || null;
  
    this.patients = this.patients.map((p: any) => {
      if (p.id === patient.id) {
        return patient;
      }
      return p;
    });
    console.log('Patients data:', this.patients); // Debugging line to check data
  }

  @Input() buttonsArray: Array<string> = [];

// dataKeys: string[] = Object.keys(this.allData[0]);




loadMore() {
  const currentLength = this.displayedData.length;
  const nextData = this.patients.slice(currentLength, currentLength + this.itemsPerPage);
  this.displayedData = this.displayedData.concat(nextData);
}

  display(button: string,patient: any) {
    if (button === "Visualiser") {
      this.selectedPatientId = patient.id; // Assurez-vous d'utiliser l'ID du patient sélectionné
      this.dossier = !this.dossier;
      this.info = false;
      this.consultation = false;
  
      // Mettez à jour le patient sélectionné avant de naviguer
      this.medecinService.setSelectedPatient(patient);
      console.log("Patient sélectionné dans Tableau2Component:", patient);
  
      this.router.navigate(['/medecin/dossier']); // Naviguer après avoir mis à jour le patient
    } else if (button === "Commencer") {
      this.consultation = !this.consultation;
      this.info = false;
      this.dossier = false;
      console.log(patient);
      this.medecinService
        .createConsultation(patient.role)
        .subscribe((consultation) => {
          console.log(consultation); // This will log the consultation after the HTTP request completes
          console.log(this.medecinService.createdConsultation); // Now, this will show the updated value
          this.router.navigate(['/medecin/consultation']);
        });
    }
  }
}