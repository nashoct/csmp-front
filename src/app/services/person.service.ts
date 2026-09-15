import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { PersonInfo } from '../interfaces/personInfo';
import { LoginService } from './login.service';

const URL = environment.URL;

@Injectable({
  providedIn: 'root',
})
export class PersonService {

  constructor(private http: HttpClient, private loginService: LoginService) {}

  getInfo(): Observable<PersonInfo> {
    return from(this.loginService.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.get<PersonInfo>(`${URL}/person/info`, { headers });
      })
    );
  }

}
