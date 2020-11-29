import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private currentLoaderSubject: BehaviorSubject<boolean>;

  constructor() {
    this.currentLoaderSubject = new BehaviorSubject<boolean>(false);
  }

  public get isLoading$(): Observable<boolean> {
    return this.currentLoaderSubject.asObservable();
  }

  public get isLoading(): boolean {
    return this.currentLoaderSubject.value;
  }

  public set loading(isLoading) {
    this.currentLoaderSubject.next(isLoading);
  }
}
