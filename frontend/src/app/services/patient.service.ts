import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
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
 
}
