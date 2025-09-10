import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [  ],
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button {
  @Input() label: string = 'Cliquez-moi';
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    this.clicked.emit();
  }
}
