import { Routes } from '@angular/router';
import { Home } from './home/home';
import { MovieList } from './movie-list/movie-list';
import { MovieDetail } from './movie-detail/movie-detail';
import { MovieForm } from './movie-form/movie-form';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { Register } from './register/register';

export const routes: Routes = [
  { path: "movies", component: MovieList},
  { path: "movies/:id", component: MovieDetail },
  { path: "movies/new", component: MovieForm },
  { path: "movies/:id/edit", component: MovieForm},
  { path: "movies", component: MovieList},
  { path: "signup", component: Register},
  { path: "login", component: Login },
  { path: "profile", component: Profile},
  { path: "", component: Home},
  { path: '**', redirectTo: '' },
];
