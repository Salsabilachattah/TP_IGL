import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InfirmierService {
  private apiUrl = 'http://127.0.0.1:8000/api/patients/'; // URL de l'API Django

  liste : Array<any> =[]; 

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // Méthode pour récupérer le nombre de patients
  getListePatients(): Observable<any> {
    // Lire le cookie 'csrftoken'
    const csrfToken = this.cookieService.get('csrftoken');

    // Ajouter le jeton CSRF dans les en-têtes
    const headers = new HttpHeaders({
      'X-CSRFToken': this.cookieService.get('csrftoken')
    });
    
    return this.http.get<any[]>(this.apiUrl, { headers, withCredentials: true }).pipe(
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
    // Lire le cookie 'csrftoken'
    const csrfToken = this.cookieService.get('csrftoken');

    // Ajouter le jeton CSRF dans les en-têtes
    const headers = new HttpHeaders({
      'X-CSRFToken': this.cookieService.get('csrftoken')
    });
    
    return this.http.get<any[]>(this.apiUrl, { headers, withCredentials: true }).pipe(
      map(
        (patients)=> {
            const matchingPatients = patients.filter(patient => patient.nss?.toString() === ident.toString());
            return matchingPatients;       
        }
      )
    ); 
  }

}

