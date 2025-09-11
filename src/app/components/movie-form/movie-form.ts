import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../models/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../common/movie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie-form',
  imports: [ FormsModule ],
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.css'
})
export class MovieForm {
  movie: Movie = {
    title: '',
    director: '',
    rating: 0,
    release_year: 2025,
    category_id: 0 // Valeur par défaut
  };

  categories = [
  { id: 1, label: 'Science-Fiction' },
  { id: 2, label: 'Drame' },
  { id: 3, label: 'Thriller / Social' },
  { id: 4, label: 'Comédie / Romance' },
  { id: 5, label: 'Animation / Fantastique' },
  { id: 6, label: 'Guerre / Historique' }
];

  isSubmitting = false;
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // On récupère l'ID du post depuis l'URL (paramètre de route) et on le convertis en number car c'est une chaine de caractère
    const postId = Number(this.route.snapshot.paramMap.get('id'));

    // Si un ID est présent, cela signifie qu'on est en mode édition
    if (postId) {
      this.isEditMode = true; // On passe en mode édition
      this.loadMovie(postId); // On charge les données du post à modifier
    }
    
  }

  // Méthode pour charger un post existant à partir de son ID
  loadMovie(id: number): void {
    this.movieService.getMovie(id).subscribe({
      // Si la requête réussit, on met à jour notre objet "post"
      next: (data) => {
        this.movie = data;
      },
      // Si une erreur survient, on affiche un message et on redirige vers la liste des posts
      error: () => {
        this.toastr.error('Impossible de charger le film.');
        this.router.navigate(['/movies']);
      },
    });
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit(): void {
    // Vérifie si les champs obligatoires sont remplis
    if (!this.movie.title || !this.movie.director || !this.movie.rating || !this.movie.release_year || !this.movie.category_id) {
      this.toastr.error('Tous les champs sont obligatoires.');
      return;
    }

    this.isSubmitting = true; // Active le mode "chargement"

    // Si on est en mode édition, on met à jour le movie
    if (this.isEditMode) {
      this.updateMovie();
    } else {
      // Sinon, on crée un nouveau movie
      this.createMovie();
    }
  }

  // Méthode pour créer un nouveau movie
  createMovie(): void {
    this.movieService.createMovie(this.movie).subscribe({
      // En cas de succès, on affiche un message et on redirige
      next: () => {
        this.toastr.success('Film ajouté avec succès !');
        this.router.navigate(['/movies']);
        this.isSubmitting = false;
      },
      // En cas d'erreur, on affiche un message d'erreur
      error: (err) => {
        this.toastr.error('Erreur lors de la création du film.');
        this.isSubmitting = false;
      },
    });
  }

  // Méthode pour mettre à jour un film existant
  updateMovie(): void {
    // On vérifie que le post a bien un ID (sinon, on ne peut pas le mettre à jour)
    if (!this.movie.id) {
      this.toastr.error('Impossible de mettre à jour : ID manquant.');
      this.isSubmitting = false;
      return;
    }

    // Appel au service pour mettre à jour le post
    this.movieService.updateMovie(this.movie.id, this.movie).subscribe({
      // En cas de succès, on affiche un message et on redirige
      next: () => {
        this.toastr.success('Post mis à jour avec succès !');
        this.router.navigate(['/posts']);
        this.isSubmitting = false;
      },
      // En cas d'erreur, on affiche un message d'erreur
      error: () => {
        this.toastr.error('Erreur lors de la mise à jour du post.');
        this.isSubmitting = false;
      },
    });
  }

  // Méthode pour revenir à la liste des posts
  onReturn(): void {
    this.router.navigate(['/movies']);
  }
}
