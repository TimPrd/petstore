import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Session } from '../models/session.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<Session>;
  public currentUser: Observable<Session>;

  private currentSession: Session;

  constructor(private router: Router, private http: HttpClient, private authenticationService: AuthService) {
    this.currentSession = this.authenticationService.currentSessionValue
  }

  public get currentUserValue(): Session {
    return this.currentUserSubject.value;
  }

  getUserById(): Observable<User> {
    const id = this.currentSession?.userId;
    return this.http.get<User>(`${environment.server}/users/${id}`).pipe(tap((res) => {
      console.log(res);
      // this.currentUserSubject.next(new User(null,u));
      return res;
    }));

  }

}