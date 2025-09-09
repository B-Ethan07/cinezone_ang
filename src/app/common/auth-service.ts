import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  signup(email: string, password: string, name: string): Observable<User> {
    return this.http.post<User>(
      `${this.baseUrl}/users`,
      {
        name: name,
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
  }

  login(email: string, password: string): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/login`,
      {
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
  }
  profil(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/profile`, {
      withCredentials: true,
    });
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, {}, { withCredentials: true });
  }
}
