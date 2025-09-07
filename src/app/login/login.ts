import { AuthService } from './../common/auth-service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ RouterLink, FormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  credentials = {
    email: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    this.authService.login(this.credentials.email, this.credentials.password).subscribe({
      next: () => {
        // Connexion réussie, rediriger vers la page d'accueil (ou tableau de bord, etc.)
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        // Gérer les erreurs (ex: mauvais identifiants)
        console.error('Erreur de connexion :', error);
        this.errorMessage = 'Email ou mot de passe incorrect.';
      }
    });
  }

}
