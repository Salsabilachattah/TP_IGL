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


/*
  private baseUrl = 'http://127.0.0.1:8000/api/soins'; // Changez en fonction de votre configuration

  
  addMedicamentsToSoin(soinId: number, data: any): Observable<any> {
    const url = `${this.baseUrl}/${soinId}/medicaments/`;
    return this.http.post(url, data);
  }*/

    private baseUrl = 'http://127.0.0.1:8000/api/soins/1/medicaments/'; 

    sendData(soinMedicamentData: any): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    
      return this.http.post<any>(this.baseUrl, soinMedicamentData, {
        withCredentials: true,
        headers: this.authService.getHeaders(),
      });
    }
    

  
  private createsoinURL = 'http://127.0.0.1:8000/api/soins/'; 
  createSoin(patientId: string, infirmierId: string, observation: string) {
    const payload = {
      patient: patientId,
      infirmier: infirmierId,
      observation: observation, // Include the required observation field
    };
  
    console.log('Payload being sent:', payload); // Log for debugging
    return this.http.post<any>(this.createsoinURL, payload, {
      withCredentials: true,
      headers: this.authService.getHeaders(),
    });
  }
  


}



