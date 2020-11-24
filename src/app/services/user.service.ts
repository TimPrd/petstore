import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { User, UserAdapter } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Session } from '../models/session.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private currentSession: Session;

  constructor(private router: Router, private http: HttpClient, private authenticationService: AuthService, private adapter: UserAdapter) {
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.currentSession = this.authenticationService.currentSessionValue;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getUserById(): Observable<User> {
    const id = this.currentSession?.userId;
    return this.http.get<User>(`${environment.server}/users/${id}`)
      .pipe(
        map(({ data: { user } }: any) => {
          const userAdapted = this.adapter.adapt(user)
          this.currentUserSubject.next(userAdapted)
          return userAdapted;
        })
      );
  }

}