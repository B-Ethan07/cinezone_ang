
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Footer } from "./components/footer/footer";
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule, Footer, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Cinezone');
}
