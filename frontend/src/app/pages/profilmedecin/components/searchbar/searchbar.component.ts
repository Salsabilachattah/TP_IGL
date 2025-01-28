import { Component } from '@angular/core';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserMultiFormatReader } from '@zxing/library';
import { Router } from '@angular/router';
import { MedecinService } from '../../../../services/medecin.service';
@Component({
  selector: 'app-searchbar',
  imports: [WebcamModule, CommonModule, FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent {
  isCamOpened: boolean = false;
  webcamImage: WebcamImage | null = null;
  private trigger: Subject<void> = new Subject<void>();
  nss: string = '';

  private codeReader: BrowserMultiFormatReader; // Initialiser le lecteur de codes QR

  constructor(private router: Router, private MedecinService: MedecinService) {
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



  affich : boolean = false;
  fields: Array<string> = ['nom', 'prenom', 'nss', 'age'];
    labels: Array<string> = [
      'NSS',
      'Nom',
      'Prénom',
      'Dossier du patient',
      'Consultation',
    ];
    buttonsArray: Array<string> = ['Visualiser', 'Commencer'];
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


  display(button: string,patient: any) {
    if (button === "Visualiser") {
      this.selectedPatientId = patient.id; // Assurez-vous d'utiliser l'ID du patient sélectionné
      this.dossier = !this.dossier;
      this.consultation = false;
  
      // Mettez à jour le patient sélectionné avant de naviguer
      this.MedecinService.setSelectedPatient(patient);
      console.log("Patient sélectionné dans Tableau2Component:", patient);
  
      this.router.navigate(['/medecin/dossier']); // Naviguer après avoir mis à jour le patient
    } else if (button === "Commencer") {
      this.consultation = !this.consultation;
      this.dossier = false;
      console.log(patient);
      this.MedecinService
        .createConsultation(patient.nss)
        .subscribe((consultation) => {
          console.log(consultation); // This will log the consultation after the HTTP request completes
          console.log(this.MedecinService.createdConsultation); // Now, this will show the updated value
          this.router.navigate(['/medecin/consultation']);
        });
    }
  }









}
