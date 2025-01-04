import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
import { BilanBioTest , BilanBiologique , BilanResponse } from '../models/bilan.model';

@Injectable({
  providedIn: 'root',
})



export class BilanService {
  private apiUrl = 'http://127.0.0.1:8080/api/bilanbio/'; // Base URL for bilans
  private apiUrl2 = 'http://127.0.0.1:8080/api/bilanradio/'; // Base URL for bilans
  private apiUrl3 = 'http://127.0.0.1:8080/api/patients/'; // Base URL for patients

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private authService: AuthService
  ) {}



  
  // Fetch non-treated bilans
  getNonTreatedBilans(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?valide=false`, {
      headers: this.authService.getHeaders(),
      withCredentials: true,
    });
  }

  getBilanByNssAndValide(nss: string, valide: boolean): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?nss=${nss}&valide=${valide}`, {
      headers: this.authService.getHeaders(),
      withCredentials: true,
    });
  }
  

  // Fetch treated bilans
  getTreatedBilans(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?valide=true`, {
      headers: this.authService.getHeaders(),
      withCredentials: true,
    });
  }

  // Example method to update a bilan (optional, for future use)
  // Méthode pour mettre à jour un bilan
  updateBilan(id: number, bilanData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}${id}/`, bilanData,{
        headers: this.authService.getHeaders(),
      withCredentials: true,  
    });
    
  }
  
  getBilanById(bilanId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${bilanId}/`, {
      headers: this.authService.getHeaders(),
      withCredentials: true,
    });
  }

  takeLaborantin(consultationId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}${consultationId}/token`, {
        headers: this.authService.getHeaders(),
        withCredentials: true,
    });
  }
  addBilanBioTest(id: number, data: { type: string; valeur: number | string }): Observable<any> {
    const url = `${this.apiUrl}${id}/add_test/`; // Ajout dynamique de l'ID
    return this.http.post(url, data,{
        headers: this.authService.getHeaders(),
        withCredentials: true, 
    });
  }
  //**************** radiologuique******************** */

  // Fetch non-treated bilans
  getNonTreatedBilansradio(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}?valide=false`, {
      headers: this.authService.getHeaders(),
      withCredentials: true,
    });
  }

  getBilanByNssAndValideradio(nss: string, valide: boolean): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}?nss=${nss}&valide=${valide}`, {
      headers: this.authService.getHeaders(),
      withCredentials: true,
    });
  }
  

  // Fetch treated bilans
  getTreatedBilansradio(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}?valide=true`, {
      headers: this.authService.getHeaders(),
      withCredentials: true,
    });
  }

  // Example method to update a bilan (optional, for future use)
  // Méthode pour mettre à jour un bilan
  updateBilanradio(id: number, bilanData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl2}${id}/`, bilanData,{
        headers: this.authService.getHeaders(),
      withCredentials: true,  
    });
    
  }
  
  getBilanByIdradio(bilanId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}${bilanId}/`, {
      headers: this.authService.getHeaders(),
      withCredentials: true,
    });
  }

  takeradiologue(consultationId: string): Observable<any> {
    return this.http.post(`${this.apiUrl2}${consultationId}/token`, {
        headers: this.authService.getHeaders(),
        withCredentials: true,
    });
  }

  getLastTwoBilans(nss: string): Observable<BilanResponse> {
    const url = `${this.apiUrl3}${nss}/bilanbio/lasttwo`; // Ajout dynamique de l'ID
    return this.http.get<BilanResponse>(url, {
      headers: this.authService.getHeaders(),
      withCredentials: true,
    });
  }


}

