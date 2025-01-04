import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BilanService {
  private apiUrl = 'http://127.0.0.1:8000/api/bilanbio/'; // Base URL for bilans
  private apiUrl2 = 'http://127.0.0.1:8000/api/bilanradio/'; // Base URL for bilans

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

 

  getBilanByNssAndValide(nss: string, valide: boolean): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?nss=${nss}&valide=${valide}`, {
      headers: this.authService.getHeaders(),
      withCredentials: true,
    });
  }
   // Fetch non-treated bilans
  getNonTreatedBilans(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?valide=false`, {
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
    const url = `${this.apiUrl}/bilanbio/${id}/add_test/`; // Ajout dynamique de l'ID
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











  //**************** list des deux bilans******************** */


  getAllBilans(nss: string, valide: boolean): Observable<any[]> {
    return forkJoin([
      this.getBilanByNssAndValide(nss, valide).pipe(
        map((response) => {
          // Extraire le tableau des bilans si la réponse est un objet
          const bilansBio = Array.isArray(response?.bilans) ? response.bilans : [];
          return bilansBio.map((bilan: any) => ({ ...bilan, type: 'Biologique' }));
        })
      ),
      this.getBilanByNssAndValideradio(nss, valide).pipe(
        map((response) => {
          // Extraire le tableau des bilans si la réponse est un objet
          const bilansRadio = Array.isArray(response?.bilans) ? response.bilans : [];
          return bilansRadio.map((bilan: any) => ({ ...bilan, type: 'Radiologique' }));
        })
      ),
    ]).pipe(
      map(([bilansBio, bilansRadio]) => {
        // Combinez les deux tableaux
        return [...bilansBio, ...bilansRadio];
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des bilans:', error);
        return throwError(error);
      })
    );
  }
  
  
}
