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
  itemsPerPage = 4;
  displayedData: any[] = [];

  constructor(private router: Router, private medecinService: MedecinService) {
    this.displayedData = this.allData.slice(0, this.itemsPerPage);
  }


  ngOnInit(): void {
    this.medecinService.getListePatients().subscribe((data: any[]) => {
      this.patients = data.map(patient => {
      const keys = Object.keys(patient);
      return {
        [keys[1]]: patient[keys[2]],
        [keys[2]]: patient[keys[3]]
      };
      });
      console.log('Patients data:', this.patients); // Debugging line to check data
      if (this.patients.length > 0) {
      this.dataKeys = Object.keys(this.patients[0]);
      this.displayedData = this.patients.slice(0, this.itemsPerPage);
      }
    });
  }


  

  @Input() buttonsArray: Array<string> = [];

 // dataKeys: string[] = Object.keys(this.allData[0]);





  loadMore() {
    const currentLength = this.displayedData.length;
    const nextData = this.allData.slice(currentLength, currentLength + this.itemsPerPage);
    this.displayedData = [...this.displayedData, ...nextData];
  }

  display(button: string) {
    if (button === "Afficher") { 
      this.info = !this.info;
      this.dossier = false;
      this.consultation = false;
    } else if (button === "Visualiser") {
      this.dossier = !this.dossier;
      this.info = false;
      this.consultation = false;
      this.router.navigate(['/medecin/dossier'])
    
    } else if (button === "Commencer") {
      this.consultation = !this.consultation;
      this.info = false;
      this.dossier = false;
      this.router.navigate(['/medecin/consultation'])
    }
  }
}
