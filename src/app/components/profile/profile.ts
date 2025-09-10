import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '../button/button';
import { User } from '../../models/user';
import { AuthService } from '../../common/auth-service';

@Component({
  selector: 'app-profile',
  imports: [ Button ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

  user?:User ;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.profil().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => console.log(err)
    });
  }
    onReturn(): void {
  this.router.navigate(['/movies']);
  }



}
