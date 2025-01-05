import { Component } from '@angular/core';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserMultiFormatReader } from '@zxing/library';
import { Router } from '@angular/router';
import { InfirmierService } from '../../../../services/infirmier.service'; 
import { MedecinService } from '../../../../services/medecin.service';
import { FormComponent } from '../../../profilmedecin/components/form/form.component';
@Component({
  selector: 'app-searchbar',
  imports: [WebcamModule, CommonModule, FormsModule,FormComponent],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent {
  isCamOpened: boolean = false;
  webcamImage: WebcamImage | null = null;
  private trigger: Subject<void> = new Subject<void>();
  nss: string = '';

  private codeReader: BrowserMultiFormatReader; // Initialiser le lecteur de codes QR

  constructor(private router: Router, private MedecinService: MedecinService, private infirmierservice: InfirmierService) {
    this.codeReader = new BrowserMultiFormatReader();
  };

  //constructor(private infirmierService: InfirmierService) { }

  scanQR() {
    this.isCamOpened = true;
  }

  capturePhoto(): void {
    this.trigger.next();
  }

  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    // Pivoter l'image avant de la décoder
    this.decodeQRCode(webcamImage.imageAsDataUrl);
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  async decodeQRCode(imageData: string) {
    // Convertir l'image en base64 en format Blob pour décodage
    const imgBlob = this.dataURLtoBlob(imageData);
    const imgFile = new File([imgBlob], 'qr-code.jpg', { type: 'image/jpeg' });
  
    try {
      // Ajout d'un petit délai avant de décoder l'image
      setTimeout(async () => {
        try {
          const result = await this.codeReader.decodeFromImageUrl(URL.createObjectURL(imgFile));
          this.nss = result.getText();  // Récupérer le NSS du code QR décodé
          console.log("NSS décodé:", this.nss);
        } catch (err) {
          console.error("Erreur de décodage du QR Code:", err);
        }
      }, 500);
    } catch (err) {
      console.error("Erreur de décodage du QR Code:", err);
    }
  }
  
  // Fonction utilitaire pour convertir l'image base64 en Blob
  dataURLtoBlob(dataURL: string): Blob {
    const byteString = atob(dataURL.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([uintArray], { type: 'image/jpeg' });
  }
/*
  rechercher() {

    this.MedecinService.getPatientDetails(this.nss).subscribe({
      next: (patient) => {
        const tableau2Component = this.router.routerState.root.children[0].component as unknown as Tableau2Component;
        tableau2Component.updatePatientDetails(patient);
        console.log("Patient trouvé:", patient);
      },
      error: (err) => {
        console.error("Erreur lors de la recherche du patient:", err);
      }
    });
    // Envoie du NSS ou de l'image au backend
    console.log("NSS recherché:", this.nss);
   
  }*/


    info : boolean = false;
  affich : boolean = false;
  fields: Array<string> = ['nom', 'prenom', 'nss', 'age'];
    labels: Array<string> = [
      'NSS',
      'Nom',
      'Prénom',
      'Dossier du patient',
      'Consultation',
    ];
    buttonsArray: Array<string> = ['Afficher', 'Commencer'];
    dataKeys: Array<string> = ['nss', 'nom' ,'prenom'];
  rechercher() {
  this.MedecinService.getPatientDetails(this.nss).subscribe({ 
    next: (patient) => { 
      this.affich=!this.affich;
      this.handlePatientSearchResult(patient); 
    }, 
    error: (err) => { 
      console.error('Erreur lors de la recherche du patient:', err);
     }, }); } 
     displayedData: any[] = [];
     patients : any[] = [];
     selectedPatientId: string='';
  handlePatientSearchResult(patient: any): void { 
  this.patients = [patient];  
  this.displayedData = [patient]; 
  this.selectedPatientId = patient.id ;
  }
  
  dossier: boolean = false;
  consultation: boolean = false;


  display(button: string,patient: any,) {
    if (button === "Afficher") {
      this.info = !this.info;
      this.nss = patient.nss;
    } else if (button === "Commencer") {
      this.consultation = !this.consultation;
      this.info = false;

      this.infirmierservice.createSoin(patient.nss , '3', 'newSoin').subscribe({
        next: (response) => {
          console.log("patient.nss", patient.nss)
          const createdSoinId = response.id; 
          localStorage.setItem('IdsoinCree',createdSoinId);
        },
        error: (err) => {
          console.error('Error while creating soin:', err);
          alert("Une erreur s'est produite lors de la création de soins.");
        }
      });
      
      

     // this.router.navigate(['/infirmier/soins',patient.nss]);
    
     this.router.navigate(['/infirmier/soins',patient.nss]);
    }
  }

  







}

/*
export class StatsComponent {


  ngOnInit(): void {
    this.patientService.getNombrePatients().subscribe({
      next: (data) => {
        this.nombre_patient = data.toString(); // Convertir en chaîne de caractères
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }
}*/
