import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { TranslationPipe } from '../../shared/translation.pipe';
import { Router, RouterLink } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule, SideNavComponent, TranslationPipe, RouterLink],
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss', './legal.component.responsive.scss'],
})
export class LegalComponent {
  isRight = false;
  today = new Date();
  constructor(private router: Router, private scroll: ScrollService) {}

  goRight() {
    this.isRight = true;
    this.scroll.scrollTo('legal-right');
  }

  goLeft() {
    this.isRight = false;
    this.scroll.scrollTo('legal-left');
  }

  scrollToTopMobile() {
    this.scroll.scrollTo('legal-left');
  }

  backToMain() {
    this.router.navigate(['/'], { fragment: 'about' });
  }

  onLegalClick(): void {
    this.isRight = false;
    const page = document.querySelector('.legal-page') as HTMLElement | null;
    page?.scrollTo({ top: 0, behavior: 'smooth' });
    const left = document.getElementById('legal-left');
    left?.scrollIntoView({ behavior: 'smooth' });
  }
}
