import { Component } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

}
