import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private router: Router, private http: HttpClient) { }

  public getPetById(idStore, idPet): Observable<any> {
    return this.http.get<any>(`${environment.server}/pet-stores/${idStore}/pets/${idPet}`);
  }

  public getAllStores(): Observable<any> {
    return this.http.get<any>(`${environment.server}/pet-stores/`).pipe(
      map(({ data: { store } }: any) => {
        return store;
      })
    )
  }

  public getStoreByOwner(id): Observable<any> {
    return this.http.get<any>(`${environment.server}/users/${id}/pet-stores`).pipe(
      map(({ data: { petstores } }: any) => {
        return [petstores];
      })
    )
  }

  public getPetInStore(storeId): Observable<any> {
    return this.http.get<any>(`${environment.server}/pet-stores/${storeId}/pets`).pipe(
      map(({ data }) => data['petIds']),
      mergeMap((petIds: any[]) => {
        return forkJoin(
          petIds.map(petId => {
            return this.getPetById(storeId, petId.id)
              .pipe(
                map(({ data: { pet } }: any) => {
                  petId = pet;
                  return petId;
                })
              );
          })
        )
      })
    )
  }
}
