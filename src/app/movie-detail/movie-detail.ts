import { Component } from '@angular/core';
import { Movie } from '../models/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../common/movie-service';
import { ToastrService } from 'ngx-toastr';
import { Button } from '../button/button';

@Component({
  selector: 'app-movie-detail',
  imports: [ Button ],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css'
})
export class MovieDetail {
  movie!: Movie;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: MovieService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.toastr.error('ID de post invalide.');
      this.router.navigate(['/movies']);
      return;
    }

    this.postService.getMovie(id).subscribe({
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

}
