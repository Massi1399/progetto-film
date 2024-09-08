import { Injectable , Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = './backend'; // Replace with your backend API
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    const currentUser = sessionStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(currentUser ? JSON.parse(currentUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(map(user => {
        if(isPlatformBrowser(this.platformId)) 
          // Store user details and jwt token in local storage to keep user logged in
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  register(name: string, surname: string, email: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registration`, { name, surname, email, password, confirmPassword })
    .pipe(map(user => {
      if(isPlatformBrowser(this.platformId))
        // Store user details and jwt token in local storage to keep user logged in
        sessionStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.router.navigate(['/myProfile']);
      return user;
    }));
  }

  logout(): void {
    if(isPlatformBrowser(this.platformId)) 
      // Remove user from local storage to log user out
      sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getUserRoles(): string[] {
    const currentUser = this.currentUserValue;
    return currentUser ? currentUser.Role : [];
  }

}
