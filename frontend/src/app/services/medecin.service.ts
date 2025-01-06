import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MedecinService {
  private apiUrl = 'http://127.0.0.1:8000/api/patients/'; // URL de l'API Django
  private baseUrl = 'http://127.0.0.1:8000/api/'; // URL de l'API Django

  liste: Array<any> = [];
  createdConsultation: any = {};

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Méthode pour récupérer la liste des patients
  getListePatients(): Observable<any> {
    return this.http
      .get<any[]>(this.apiUrl, {
        headers: this.authService.getHeaders(),
        withCredentials: true,
      })
      .pipe(
        map((patients) => {
          this.liste = patients;
          console.log(patients); // Print the list of patients
          return patients;
        })
      );
  }
  // Méthode pour récupérer les détails d'un patient par NSS
  getPatientDetails(nss: string): Observable<any> {
    const headers = this.authService.getHeaders(); // Get the headers
    const url = `${this.apiUrl}${nss}/`; // Construct the URL with the NSS

    return this.http.get<any>(url, { headers, withCredentials: true }).pipe(
      map((patient) => {
        console.log(patient); // Print the patient details
        return patient;
      })
    );
  }
  createConsultation(nss: string): Observable<any> {
    const headers = this.authService.getHeaders(); // Get the headers
    const url = `${this.apiUrl}${nss}/consultation/`; // Construct the URL with the NSS

    return this.http
      .post<any>(url, {}, { headers, withCredentials: true })
      .pipe(
        map((consultation) => {
          this.createdConsultation = consultation;
          console.log(consultation); // Print the patient details
          console.log(this.createdConsultation); // Print the patient details
          return consultation;
        })
      );
  }
  createBilanRadioConsultation(
    id: string,
    description: string
  ): Observable<any> {
    const headers = this.authService.getHeaders(); // Get the headers
    const url = `${this.baseUrl}bilanradio/${id}/`; // Construct the URL with the NSS

    return this.http
      .post<any>(url, { description }, { headers, withCredentials: true })
      .pipe(
        map((res) => {
          this.createdConsultation.bilanradio = description;
          console.log(res); // Print the patient details
          console.log(this.createdConsultation.bilanradio); // Print the patient details
          return description;
        })
      );
  } createBilanBioConsultation(id: string, description: string): Observable<any> {
    const headers = this.authService.getHeaders(); // Get the headers
    const url = `${this.baseUrl}bilanbio/${id}/`; // Construct the URL with the NSS

    return this.http
      .post<any>(url, { description }, { headers, withCredentials: true })
      .pipe(
        map((res) => {
          this.createdConsultation.bilanbio = description;
          console.log(res); // Print the patient details
          console.log(this.createdConsultation.bilanbio); // Print the patient details
          return description;
        })
      );
  }
  redigerResume(id: string, resume: string): Observable<any> {
    const headers = this.authService.getHeaders(); // Get the headers
    const url = `${this.baseUrl}consultations/${id}/`; // Construct the URL with the NSS

    return this.http
      .patch<any>(url, { resume }, { headers, withCredentials: true })
      .pipe(
        map((res) => {
          this.createdConsultation.resume = resume;
          console.log(resume); // Print the patient details
          console.log(this.createdConsultation.bilanbio); // Print the patient details
          return resume;
        })
      );
  }
  saveOrdonnance(id: string, ordonnance: any): Observable<any> {
    const headers = this.authService.getHeaders(); // Get the headers
    const url = `${this.baseUrl}consultation/${id}/ordonnance/`; // Construct the URL with the ID
    console.log('iddd', id);
  // ordonnance.medecin = this.authService.getUserInfo; // Store the doctor information
    return this.http
      .post<any>(url, ordonnance, { headers, withCredentials: true })
      .pipe(
        map((res) => {
          this.createdConsultation.ordonnance = ordonnance;
          console.log(res); // Print the response
          console.log(this.createdConsultation.ordonnance); // Print the ordonnance
          return res;
        })
      );
  }

  selectedPatient: any;

 

  setSelectedPatient(patient: any): void {
    this.selectedPatient = patient;
    // Assurez-vous que vous utilisez bien cette méthode lors de la sélection d'un patient
  console.log("Patient sélectionné dans med serivce:", patient); // Pour le débogage

  }

  getSelectedPatient(): any {
    return this.selectedPatient;
  }



  getPatientByNss(nss: number): Observable<any> {
    const headers = this.authService.getHeaders(); 
    return this.http.get<any>(`${this.apiUrl}${nss}/`, { headers, withCredentials: true });
  }

  getOrdonnancesByNss(nss: number): Observable<any[]> {
    const headers = this.authService.getHeaders();
    const url = `${this.apiUrl}${nss}/ordonnances/`; // URL complète
    return this.http.get<any[]>(url, {
      headers,
      withCredentials: true
    });
  }

}