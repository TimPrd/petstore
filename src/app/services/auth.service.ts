import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Session } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentSessionSubject: BehaviorSubject<Session>;
  public currentSession: Observable<Session>;

  constructor(private router: Router, private http: HttpClient) {
    const currentSession = JSON.parse(localStorage.getItem('currentSession'));
    if (currentSession) {
      this.currentSessionSubject = new BehaviorSubject<Session>(new Session(currentSession.token));
    } else {
      this.currentSessionSubject = new BehaviorSubject<Session>(null);
    }
    this.currentSession = this.currentSessionSubject.asObservable();
  }

  public get currentSessionValue(): Session {
    return this.currentSessionSubject.value;
  }

  public signup({ username, password, birthday, firstName, lastName, role }): Observable<any> {
    return this.http.post(`${environment.server}/auth/signup`, { "user": { login: username, password, birthday, firstName, lastName, role } });
  }

  public signin(user): Observable<any> {
    const base = btoa(`${user.username}:${user.password}`);
    const headers = new HttpHeaders().set('authorization', `Basic ${base}`);
    return this.http.get<any>(`${environment.server}/auth/signin`, { headers }).pipe(tap(({ token, id }) => {
      if (token) {
        localStorage.setItem('currentSession', JSON.stringify({ token: token }));
        this.currentSessionSubject.next(new Session(token));
      }
    }));
  }

  public logout(): void {
    localStorage.removeItem('currentSession');
    this.currentSessionSubject.next(null);
    this.router.navigate(['/signin', { outlets: { side: null } }]);
  }

  public get token() {
    return this.currentSessionValue?.jwt;
  }

  public get isLoggedIn() {
    return this.currentSessionValue;
  }
}