import { Component ,Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusbuttonComponent } from '../../../../components/plusbutton/plusbutton.component';
import { Router } from '@angular/router';
import { FormComponent } from '../../../profilmedecin/components/form/form.component';
import { map } from 'rxjs';
import { InfirmierService } from '../../../../services/infirmier.service';

@Component({
  selector: 'app-tableau',
  imports: [CommonModule,PlusbuttonComponent,FormComponent],
  templateUrl: './tableau.component.html',
  styleUrl: './tableau.component.css'
})
export class TableauComponent {
  info: boolean = false;
  consultation: boolean = false;

  @Input() labels: Array<string> = [];
// get the data from the backend 
  allData : Array <any> = [];
  

  

  @Input() buttonsArray: Array<string> = [];

  nss:string = '';

  dataKeys: string[] = ["nom","prenom"];

  itemsPerPage = 4;
  displayedData: any[] = [];

  constructor(private router : Router , private infirmierservice: InfirmierService) {
    this.displayedData = this.allData.slice(0, this.itemsPerPage);
  }

  loadMore() {
    const currentLength = this.displayedData.length;
    const nextData = this.allData.slice(currentLength, currentLength + this.itemsPerPage);
    this.displayedData = [...this.displayedData, ...nextData];
  }
  display(button: string,patient: any,) {
    if (button === "Afficher") {
      this.info = !this.info;
      this.nss = patient.nss;
    } else if (button === "Commencer") {
      this.consultation = !this.consultation;
      this.info = false;

      this.infirmierservice.createSoin(patient.nss , '3', 'newSoin').subscribe({
        next: (response) => {
          const createdSoinId = response.id; 
          localStorage.setItem('IdsoinCree',createdSoinId);
        },
        error: (err) => {
          console.error('Error while creating soin:', err);
          alert("Une erreur s'est produite lors de la création de soins.");
        }
      });
      
        
     this.router.navigate(['/infirmier/soins',patient.nss]);
    }
  }

  ngOnInit(): void {
    this.infirmierservice.getListePatients().subscribe({
      next: (data) => {
        this.allData = data;
       // this.dataKeys = this.allData.length > 0 ? Object.keys(this.allData[0]) : [];
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }
  
}



