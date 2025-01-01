import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
export interface AuthResponse {
  access: string; // Access token
  refresh: string; // Refresh token
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/'; // Django backend URL

  constructor(private http: HttpClient, private cookieService: CookieService) {}
  // 1. Retrieve the access token from localStorage
  private getToken(): string | null {
    return localStorage.getItem('token'); // Get access token from localStorage
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();

    if (!token) {
      console.error('token not found in localStorage');
      return new HttpHeaders();
    }

    return new HttpHeaders({
      Authorization: token,
    });
  }

  login(username="", password=""): Observable<any> {
    console.log(username + ' ' + password);
    return this.refreshToken().pipe(
      catchError(() => {
        console.log('Refresh token failed, authenticating user...');
        return this.authenticate(username, password);
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
      )
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

  isConnected(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/auth/jwt/verify`,
      { token: this.getToken() },
      {
        withCredentials: true,
        headers: this.getHeaders(),
      }
    );
  }
}
