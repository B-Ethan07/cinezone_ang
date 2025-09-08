import { Component } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { RouterLink } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../common/auth-service';
import { CommonModule } from '@angular/common';


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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.profil().subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  logout(): void {
  this.authService.logout().subscribe(() => {
      this.router.navigate(['/login'])
  });
}
}
