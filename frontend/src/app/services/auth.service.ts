import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
// Hopital interface (Assuming this is your custom Hopital model)
interface Hopital {
  id: number;
  name: string;
}

// Employe interface
interface Employe {
  id: number;
  hopital: Hopital | null; // Assuming Hopital is another interface
  nom: string | null;
  prenom: string | null;
  telephone: string | null;
  created_at: string; // ISO string format
  updated_at: string; // ISO string format
}

// Patient interface
interface Patient {
  nss: number; // BigInteger is represented as number
  nom: string;
  prenom: string;
  date_de_naissance: string; // ISO string format (date)
  adresse: string | null;
  telephone: string | null;
  mutuelle: string | null;
  created_at: string; // ISO string format
  updated_at: string; // ISO string format
}

export interface AuthResponse {
  access: string; // Access token
  refresh: string; // Refresh token
}
type User = (Employe | Patient) & {
  role:
    | 'medecin'
    | 'administratif'
    | 'infirmier'
    | 'radiologue'
    | 'pharmacien'
    | 'laboratorien'
    | 'patient';
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8000';
  public user: User | null = null;
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  // 1. Retrieve the access token from localStorage
  private getToken(): string | null {
    return localStorage.getItem('token'); // Get access token from localStorage
  }

  public getHeaders(): HttpHeaders {
    const token = this.getToken();

    if (!token) {
      console.error('token not found in localStorage');
      return new HttpHeaders();
    }

    return new HttpHeaders({
      Authorization: `JWT ${token}`,
    });
  }

  login(username = '', password = ''): Observable<any> {
    console.log(username + ' ' + password);
    return this.refreshToken().pipe(
      tap(() => this.getUserInfo()),
      catchError(() => {
        console.log('Refresh token failed, authenticating user...');
        this.authenticate(username, password).subscribe();
        return this.getUserInfo();
      })
    );
  }
  private authenticate(username: string, password: string): Observable<any> {
    return this.http
      .post<AuthResponse>(
        `${this.baseUrl}/auth/jwt/create`,
        { username, password },
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          // Store access and refresh tokens in localStorage
          localStorage.setItem('token', response.access); // Store access token
          localStorage.setItem('refreshToken', response.refresh); // Store refresh token
        })
      );
  }
  private refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http
      .post<AuthResponse>(
        `${this.baseUrl}/auth/jwt/refresh`,
        { refresh: refreshToken },
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.access); // Store new access token
        })
      );
  }

  logout() {
    localStorage.removeItem('token'); // Remove the access token from localStorage
    localStorage.removeItem('refreshToken'); // Remove the refresh token from localStorage
  }
  isConnected(): Observable<{}> {
    if (this.user) return of(true); // If already connected, return true directly

    return this.http
      .post<{}>( // Adjust the response type if needed
        `${this.baseUrl}/auth/jwt/verify`,
        { token: this.getToken() },
        {
          withCredentials: true,
          headers: this.getHeaders(),
        }
      )
      .pipe(
        tap(() => {
          // If connected, fetch user data
          this.getUserInfo().subscribe();
          return of(true);
        }),
        catchError((error) => {
          console.error('Connection check failed:', error);
          return of(false); // Return false if the connection check fails
        })
      );
  }

  // Fetch user data from the /api/me endpoint
  getUserInfo(): Observable<User | null> {
    return this.http
      .get<User>(`${this.baseUrl}/api/me/`, {
        headers: this.getHeaders(),
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          console.log(response);
          this.user = response; // Set the user data
          localStorage.setItem('user', JSON.stringify(response)); // Store new access token
        }),
        catchError((error) => {
          console.error('Error fetching user info', error);
          return of(null); // Return null if there's an error fetching user info
        })
      );
  }
}