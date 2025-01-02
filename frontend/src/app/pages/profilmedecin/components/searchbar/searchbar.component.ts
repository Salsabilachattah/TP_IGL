import { Component } from '@angular/core';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserMultiFormatReader } from '@zxing/library';

import { InfirmierService } from '../../../../services/infirmier.service';

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

  constructor() {
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

  rechercher() {
    // Envoie du NSS ou de l'image au backend
    console.log("NSS recherché:", this.nss);
   
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
