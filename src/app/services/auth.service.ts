import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/backend_API/routes/api.php';  // Aggiorna l'URL in base alla configurazione del server

  constructor(private http: HttpClient) {}

  register(name:string ,surname: string, email:string, password: string, confirmPassword:string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, surname, email, password, confirmPassword });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  logout(): Observable<any> {
    // Cancella il cookie JWT inviando una richiesta al server (opzionale, a seconda di come gestisci il logout)
    //document.cookie = 'jwt_token=; Max-Age=0; path=/;';
    return this.http.get(`${this.apiUrl}/logout`);
  }

  // Metodo per verificare il token tramite il server
  validateToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/validate_token.php`);
  }
}
