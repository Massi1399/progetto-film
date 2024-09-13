import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/backend_API';  // Aggiorna l'URL in base alla configurazione del server

  constructor(private http: HttpClient) {}

  register(name:string ,surname: string, email:string, password: string, confirmPassword:string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register.php`, { name, surname, email, password, confirmPassword });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login.php`, { username, password });
  }

  logout(): void {
    // Cancella il cookie JWT inviando una richiesta al server (opzionale, a seconda di come gestisci il logout)
    document.cookie = 'jwt_token=; Max-Age=0; path=/;';
  }

  // Metodo per verificare il token tramite il server
  validateToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/validate_token.php`);
  }
}
