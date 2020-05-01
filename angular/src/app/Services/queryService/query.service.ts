import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  public query: BehaviorSubject<Object> = new BehaviorSubject<Object>({});

  constructor() { }
}
