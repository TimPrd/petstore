import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) {
    const currentSession = JSON.parse(localStorage.getItem('currentSession'));
    console.log(currentSession);
  }

  public signup({ username, password }): Observable<any> {
    return this.http.post(`${environment.server}/signup`, { username, password });
  }

  public signin(user): Observable<any> {
    const base = btoa(`${user.username}:${user.password}`);
    const headers = new HttpHeaders().set('authorization', `Basic ${base}`);
    //to tap
    return this.http.get<any>(`${environment.server}/auth/signin`, { headers }).pipe(map((res) => {
      if (res.token) {
        console.log(jwt_decode(res.token));
        localStorage.setItem('currentSession', JSON.stringify(res));
      }
      return res;
    }));
  }

  public logout(): void {
    localStorage.removeItem('currentSession');
    this.router.navigate(['/signin']);
  }

  public get token() {
    const currentSession: { token: string } = JSON.parse(localStorage.getItem('currentSession'));
    if (currentSession?.token) return currentSession.token;
    return null;
  }

  public get isLoggedIn() {
    return !!this.token;
  }
}