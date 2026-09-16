import { Injectable } from '@angular/core';
import { AuthResponse } from '../interfaces/authResponse'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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
    this.isNative = this.platform.is('ios') || this.platform.is('android');
    this.ready = this.storage.create();
  }

  login(email: string, password: string): Observable<boolean> {
    const data = { email, password };

    return this.http.post<AuthResponse>(`${URL}/auth/signin`, data, { observe: 'response' }).pipe(
      switchMap((response) => {
        const token = response.body?.token;
        if (response.status === 200 && token) {
          this.token = token;
          return from(this.saveToken(token)).pipe(map(() => true));
        }
        return of(false);
      })
    );
  }

  async saveToken(token: string) {
    if (this.isNative) {
      await SecureStoragePlugin.set({ key: 'token', value: token });
    } else {
      await this.ready;
      await this.storage.set('token', token);
    }
  }

  async getToken(): Promise<string> {
    if (this.token) {
      return this.token;
    }
    if (this.isNative) {
      const { value } = await SecureStoragePlugin.get({ key: 'token' }).catch(() => ({ value: '' }));
      this.token = value ?? '';
    } else {
      await this.ready;
      this.token = (await this.storage.get('token')) ?? '';
    }
    return this.token;
  }

  async logout(): Promise<void> {
    this.token = '';
    if (this.isNative) {
      await SecureStoragePlugin.remove({ key: 'token' }).catch(() => {});
    } else {
      await this.ready;
      await this.storage.remove('token');
    }
  }

}
