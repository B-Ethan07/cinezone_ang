import { Component } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { AuthService } from '../../common/auth-service';


@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  user?:User ;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.profil().subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  logout(event: Event): void {
    event.preventDefault();
  this.authService.logout().subscribe({
      next: () => this.router.navigate(['']),
      error: () => alert('Erreur durant la deconnexion'),
  });
}
  onCreate() {
    this.router.navigate(['movies/new']);
  }
}
