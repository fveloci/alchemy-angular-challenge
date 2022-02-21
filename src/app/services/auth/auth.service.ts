import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(environment.AUTH_URL, {email: email, password: password})
  }

  saveTokenInStorage(token: string) {
    localStorage.setItem('auth_token', token);
  }
  getTokenFromStorage() {
    return localStorage.getItem('auth_token')
  }

  logout() {
    localStorage.removeItem('auth_token');
  }
}
