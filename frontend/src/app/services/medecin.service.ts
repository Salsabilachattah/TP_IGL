import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class MedecinService {
    private apiUrl = 'http://127.0.0.1:8000/api/patients/'; // URL de l'API Django


    liste: Array<any> = [];

    constructor(private http: HttpClient, private authService: AuthService) {}

    // Méthode pour récupérer la liste des patients
    getListePatients(): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.authService.getToken()}` // Include the authentication token
        });

        return this.http.get<any[]>(this.apiUrl, { headers, withCredentials: true }).pipe(
            map(
                (patients) => {
                    this.liste = patients;
                    console.log(patients); // Print the list of patients
                    return patients;
                }
            )
        );
    }
    // Méthode pour récupérer les détails d'un patient par NSS
    getPatientDetails(nss: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.authService.getToken()}` // Include the authentication token
        });

        const url = `${this.apiUrl}${nss}/`; // Construct the URL with the NSS

        return this.http.get<any>(url, { headers, withCredentials: true }).pipe(
            map(
                (patient) => {
                    console.log(patient); // Print the patient details
                    return patient;
                }
            )
        );
    }
}