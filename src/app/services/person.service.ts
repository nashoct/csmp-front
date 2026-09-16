import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { PersonInfo } from '../interfaces/personInfo';

const URL = environment.URL;

@Injectable({
  providedIn: 'root',
})
export class PersonService {

  constructor(private http: HttpClient) {}

  getInfo(): Observable<PersonInfo> {
    return this.http.get<PersonInfo>(`${URL}/person/info`);
  }

}
