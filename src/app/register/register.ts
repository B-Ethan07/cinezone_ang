import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../common/auth-service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  imports: [ RouterLink, FormsModule, CommonModule ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  user: User = {
    id: 0, // Add a valid `id` since it's required in the `User` interface
    name: '',
    credentials: {
      email: '',
      password: ''
    }
  };

  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSignup() {
    this.authService.signup(this.user.credentials.email, this.user.credentials.password, this.user.name).subscribe({
      next: () => {
        // Connexion réussie, rediriger vers la page d'accueil (ou tableau de bord, etc.)
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        // Gérer les erreurs (ex: mauvais identifiants)
        console.error('Erreur de connexion :', error);
        this.errorMessage = 'Champ nom, email ou mot de passe incorrect.';
      }
    });
  }
}
