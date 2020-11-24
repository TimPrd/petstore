import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private router: Router, private authService: AuthService, private http: HttpClient) {

  }

  public getById(idStore, idPet): Observable<any> {
    return this.http.get<any>(`${environment.server}/pet-stores/${idStore}/pets/${idPet}`).pipe(map((res) => {
      console.log("RET PET /1", res);
      return res;
    }));
  }

}
