import { MovieService } from './../common/movie-service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Movie } from '../models/movie';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList {
  movies: Movie[] = [];
  loading: boolean = true;
  deletedMovie: number[] = [];

  selectedCategoryId: number | null = null;
  categories: { [id: number]: string } = {
    1: 'Science-Fiction',
    2: 'Drame',
    3: 'Thriller / Social',
    4: 'Comédie / Romance',
    5: 'Animation / Fantastique',
    6: 'Guerre / Historique',
  };

  constructor(
    private movieService: MovieService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.toastr.info('Chargement des Films');
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
      },
      error: (err) => {
        this.toastr.error('Erreur de chargement des Films');
        console.error('Erreur de chargement des films');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      this.movieService.deleteMovie(id).subscribe({
        next: () => {
          this.toastr.success('Post supprimé avec succès');
          this.deletedMovie.push(id); // mise à jour locale
        },
        error: () => {
          this.toastr.error('Échec de la suppression du post');
        },
      });
    }
  }


  get filteredMovies(): Movie[] {
  if (this.selectedCategoryId === null) {
    return this.movies.filter(movie => !this.deletedMovie.includes(movie.id ?? -1));
  }
  return this.movies.filter(
    movie => movie.category_id === this.selectedCategoryId && !this.deletedMovie.includes(movie.id ?? -1)
  );
}
 get categoryIds(): number[] {
  return Object.keys(this.categories).map(id => +id);
}


  onEdit(id: number): void {
    this.router.navigate([`movies/${id}/edit`]);
  }

  onView(id: number): void {
    this.router.navigate(['/movies', id]);
  }
  onCreate() {
    this.router.navigate(['movies/new']);
  }
  sortByCategory() {
    this.movies.sort((a, b) => a.category_id - b.category_id);
  }

  getCategoryName(id: number): string {
    return this.categories[id] || 'Inconnue';
  }

  sortByYearAsc() {
    this.movies.sort((a, b) => a.release_year - b.release_year);
  }

  sortByYearDesc() {
    this.movies.sort((a, b) => b.release_year - a.release_year);
  }
}
