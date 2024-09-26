import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  register(name:string ,surname: string, email:string, password: string, password_confirmation:string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, { name, surname, email, password, password_confirmation });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  logout(): Observable<any> {
    // Cancella il cookie JWT inviando una richiesta al server (opzionale?)
    //document.cookie = 'jwt_token=; Max-Age=0; path=/;';
    return this.http.post(`${this.apiUrl}/auth/logout`, {});
  }

  userData(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/me`, {});
  }
}
