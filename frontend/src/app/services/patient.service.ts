import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://127.0.0.1:8000/api/patients/'; // URL de l'API Django
 
  constructor(private http: HttpClient, private cookieService: CookieService,private authService :AuthService) {}

  // Méthode pour récupérer le nombre de patients
  getNombrePatients(): Observable<number> {
    return this.http.get<any[]>(this.apiUrl, { headers:this.authService.getHeaders(), withCredentials: true }).pipe(
      map(patients => patients.length)
    );
  }

 // Méthode pour créer un DPI et récupérer un fichier image
createDPI(patientData: any): Observable<Blob> {
  console.log('Données envoyées à l\'API:', patientData); // Log avant la requête
  
  return this.http.post(this.apiUrl, patientData, {
    headers: this.authService.getHeaders(),
    withCredentials: true,
    responseType: 'blob', // Important : spécifier que la réponse est un blob
  });
}



getConsultations(): Observable<any[]> {
  const nss = this.authService.getNss();
  
  if (!nss) {
    console.error("NSS introuvable pour le patient connecté.");
    return of([]); // Retournez un Observable vide si le NSS est absent
  }

  const url = `${this.apiUrl}${nss}/consultation/`;
 
  return this.http.get<any[]>(url, {
   headers: this.authService.getHeaders(),
   withCredentials: true,
  });
}

getConsultationsbynss(nss: string): Observable<any[]> {
  const url = `${this.apiUrl}${nss}/consultation/`;
  
  return this.http.get<any[]>(url, {
    headers: this.authService.getHeaders(),
    withCredentials: true,
  });
}
// Méthode pour récupérer tous les soins
// Méthode pour récupérer tous les soins par NSS
getAllSoins(nss: number): Observable<any[]> {
  const url = `${this.apiUrl}${nss}/soins/`; // Construire l'URL en utilisant le NSS
  return this.http.get<any[]>(url, {
    headers: this.authService.getHeaders(),
    withCredentials: true,
  });
}


}

