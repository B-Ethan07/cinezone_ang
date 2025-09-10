import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Button } from '../button/button';
import { Movie } from '../../models/movie';
import { MovieService } from '../../common/movie-service';

@Component({
  selector: 'app-movie-detail',
  imports: [ Button ],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css'
})
export class MovieDetail {
  movie!: Movie;
  isLoading = true;
  deletedMovie: number[] = [];
  categories: { [id: number]: string } = {
  1: 'Science-Fiction',
  2: 'Drame',
  3: 'Thriller / Social',
  4: 'Comédie / Romance',
  5: 'Animation / Fantastique',
  6: 'Guerre / Historique'
};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.toastr.error('ID de post invalide.');
      this.router.navigate(['/movies']);
      return;
    }

    this.movieService.getMovie(id).subscribe({
      next: (data) => {
        this.movie = data;
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Erreur lors du chargement du post.');
        this.router.navigate(['/movies']);
      }
    });
  }
  onReturn(): void {
  this.router.navigate(['/movies']);
  }
    getCategoryName(id: number): string {
  return this.categories[id] || 'Inconnue';
  }

  onEdit(id: number): void {
    this.router.navigate([`movies/${id}/edit`]);
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

}
