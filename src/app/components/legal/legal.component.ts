import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../side-nav/side-nav.component';
@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule, SideNavComponent],
  templateUrl: './legal.component.html',
  styleUrl: './legal.component.scss',
})
export class LegalComponent {
  isRight = false;
  goRight() {
    this.isRight = true; // falls du es anderweitig noch brauchst
    document
      .getElementById('legal-right')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
  }

  goLeft() {
    this.isRight = false;
    document
      .getElementById('legal-left')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
  }

  onKeyNext(ev: KeyboardEvent) {
    const k = ev.key;
    if (k === 'Enter' || k === ' ' || k === 'Spacebar') {
      ev.preventDefault();
      this.goRight();
    }
  }
  onKeyBack(ev: KeyboardEvent) {
    const k = ev.key;
    if (k === 'Enter' || k === ' ' || k === 'Spacebar') {
      ev.preventDefault();
      this.goLeft();
    }
  }
}
