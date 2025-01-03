import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class InfirmierService {
  private apiUrl = 'http://127.0.0.1:8000/api/patients/'; // URL de l'API Django

  liste : Array<any> =[]; 

  constructor(private http: HttpClient, private cookieService: CookieService,private authService :AuthService) {}

  // Méthode pour récupérer le nombre de patients
  getListePatients(): Observable<any> {
    
    return this.http.get<any[]>(this.apiUrl, { headers:this.authService.getHeaders(), withCredentials: true }).pipe(
      map(
        (patients)=> {
            this.liste = patients;
            return patients;
        }
      )
    ); 
  }
 
  // Méthode pour récupérer les informations du patient
  Info : Array<any> =[]; 

  getInfoPatient(ident: string): Observable<any> {
    return this.http
      .get<any[]>(this.apiUrl, {
        headers: this.authService.getHeaders(),
        withCredentials: true,
      })
      .pipe(
        map((patients) => {
          const matchingPatients = patients.filter(
            (patient) => patient.nss?.toString() === ident.toString()
          );
          return matchingPatients;
        })
      ); 
  }

    SoinId = localStorage.getItem('IdsoinCree');
    // Méthode pour envoyer les medicaments 
    private baseUrl = `http://127.0.0.1:8000/api/soins/${this.SoinId}/medicaments/`; 

    sendData(soinMedicamentData: any): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    
      return this.http.post<any>(this.baseUrl, soinMedicamentData, {
        withCredentials: true,
        headers: this.authService.getHeaders(),
      });
    }
    
    // Méthode pour envoyer les soins
    private SoinInfUrl = `http://127.0.0.1:8000/api/soins/${this.SoinId}/infirmiers/`; 
    sendSoin(soinInfData: any): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    
      return this.http.post<any>(this.SoinInfUrl, soinInfData, {
        withCredentials: true,
        headers: this.authService.getHeaders(),
      });
    }

    // Méthode pour envoyer l etat
    private SendEtatUrl = `http://127.0.0.1:8000/api/soins/${this.SoinId}/observations/`; 
    sendEtat(soinInfData: any): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    
      return this.http.post<any>(this.SendEtatUrl, soinInfData, {
        withCredentials: true,
        headers: this.authService.getHeaders(),
      });
    }
   
    // Méthode pour creer un soin

  private createsoinURL = 'http://127.0.0.1:8000/api/soins/';
  createSoin(patientId: string, infirmierId: string, observation: string): Observable<any> {
    const payload = {
      patient: patientId,
      infirmier: infirmierId,
      observation: observation, 
    };

  return this.http.post<any>(this.createsoinURL, payload, {
    withCredentials: true,
    headers: this.authService.getHeaders(),
  });
}




  


}



