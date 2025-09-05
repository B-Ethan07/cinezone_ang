import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl = 'http://localhost:3000/'

  constructor(private http: HttpClient){}

  getMovies(): Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.baseUrl}movies`)
  }
  getMovie(id: number): Observable<Movie>{
    return this.http.get<Movie>(`${this.baseUrl}movies/${id}`)
  }
  createMovie(movie: Movie): Observable<Movie>{
    return this.http.post<Movie>(`${this.baseUrl}movies`, movie)
  }
  updateMovie(id: number, movie: Movie): Observable<Movie>{
    return this.http.put<Movie>(`${this.baseUrl}movies/${id}`, movie)
  }
  deleteMovie(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}movies/${id}`)
  }
}
