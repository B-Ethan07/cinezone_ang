import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user:User | null = null;

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

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

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(
        `${this.baseUrl}/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .pipe(
        tap({
          next: (u) => {
            this.user = u;
          },
          error: () => {
            this.user = null;
          },
        })
      );
  }
  profil(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/profile`, {
      withCredentials: true,
    })
  }
    refreshProfil(): void {
    this.http.get<User>(`${this.baseUrl}/profile`, {
      withCredentials: true,
    }).subscribe({
      next: (u) => {
        this.user = u;
      },
      error: ()=> {
        this.user = null
      }
    });
  }

logout(): Observable<void> {
  return this.http.get<void>(`${this.baseUrl}/logout`, { withCredentials: true }).pipe(
    tap({
      next: () => {
        console.log('Déconnexion réussie');
        this.user = null;
      },
      error: (err) => {
        console.error('Erreur de déconnexion', err); // Ajoute ça
      }
    })
  );
}
}
