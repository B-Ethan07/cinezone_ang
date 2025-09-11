import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../common/auth-service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  user: User = {
    id: 0, // Add a valid `id` since it's required in the `User` interface
    name: '',
    email: '',
    credentials: {
      password: '',
    },
  };
  verifyPassword: string = '';

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

onSignup() {
  if (this.user.credentials.password !== this.verifyPassword) {
    this.errorMessage = 'Les mots de passe ne correspondent pas';
    return;
  }

  this.authService.signup(this.user.email, this.user.credentials.password, this.user.name)
    .subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Erreur d\'inscription :', error);
        this.errorMessage = 'Erreur lors de l\'inscription. Veuillez réessayer.';
      },
    });
}

}
