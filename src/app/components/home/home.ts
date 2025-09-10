import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from '../button/button';

@Component({
  selector: 'app-home',
  imports: [ Button ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  constructor(private router: Router){}
  onMovies() {
    this.router.navigate(['movies']);
  }
}
