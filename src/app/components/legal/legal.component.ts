import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { TranslationPipe } from '../../shared/translation.pipe';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule, SideNavComponent, TranslationPipe],
  templateUrl: './legal.component.html',
  styleUrl: './legal.component.scss',
})
export class LegalComponent {
  isRight = false;

  constructor(private router: Router) {}

  goRight() {
    this.isRight = true;
    document.getElementById('legal-right')?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }

  goLeft() {
    this.isRight = false;
    document.getElementById('legal-left')?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }

  backToMain() {
    this.router.navigate(['/'], { fragment: 'about' });
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

  scrollToTopMobile() {
    const topSection = document.querySelector('.legal') as HTMLElement | null;
    topSection?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
