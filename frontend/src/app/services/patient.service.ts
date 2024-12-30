import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = 'http://127.0.0.1:8000/api/patients/count'; // Remplacez par l'URL réelle de votre backend

  constructor(private http: HttpClient) { }

  getNombrePatients(): Observable<number> {
    return this.http.get<number>(this.apiUrl); // L'API retourne le nombre de patients
  }
}
