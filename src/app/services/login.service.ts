import { Injectable } from '@angular/core';
import { Login } from '../models/login.model'
import { AuthResponse } from '../interfaces/authResponse'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { Storage } from '@ionic/storage-angular'
import { Platform } from '@ionic/angular'

const URL = environment.URL;

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private ready: Promise<Storage>;
  private isNative: boolean;
  token: string = "";

  constructor(private http: HttpClient, private storage: Storage, private platform: Platform) {
    console.log('Servicio inicializado');
    this.isNative = this.platform.is('ios') || this.platform.is('android');
    this.ready = this.storage.create();
  }

  login ( email: string, password: string) {
    const data = { email, password }

    this.http.post<AuthResponse>(`${ URL }/auth/signin`, data ).subscribe( (resp: AuthResponse) => {
      console.log(resp);
      if (resp.status == 'OK') {
        this.saveToken(resp.token);
      } else {
        this.storage.clear();
      }
    })
  }

  async saveToken(token: string) {

    if (this.isNative) {
      //await this.storage.set('token', token);
      await SecureStoragePlugin.set({ key: 'token', value: token });
    } else {
      await this.ready;
      await this.storage.set('token', token);
    }
  }

}
