import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = 'http://127.0.0.1:8000/api/patients/'; // Remplacez par l'URL réelle de votre backend

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer le nombre de patients
  getNombrePatients(): Observable<number> {
    return this.http.get<any[]>(this.apiUrl).pipe( // On s'attend à recevoir un tableau d'objets
      map(patients => patients.length) // On retourne la longueur du tableau
    );
  }
}
