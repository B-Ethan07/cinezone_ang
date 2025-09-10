import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { MovieForm } from './components/movie-form/movie-form';
import { MovieDetail } from './components/movie-detail/movie-detail';
import { MovieList } from './components/movie-list/movie-list';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Profile } from './components/profile/profile';

export const routes: Routes = [
  { path: "movies", component: MovieList},
  { path: "movies/new", component: MovieForm },
  { path: "movies/:id", component: MovieDetail },
  { path: "movies/:id/edit", component: MovieForm},
  { path: "movies", component: MovieList},
  { path: "signup", component: Register},
  { path: "login", component: Login },
  { path: "profile", component: Profile},
  { path: "", component: Home},
  { path: '**', redirectTo: '' },
];
