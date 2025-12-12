import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../components/side-nav/side-nav.component';
import { TranslationPipe } from '../shared/translation.pipe';
import { Router, RouterLink } from '@angular/router';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, SideNavComponent, TranslationPipe, RouterLink],
  templateUrl: './privacy-policy.component.html',
  styleUrls: [
    './privacy-policy.component.scss',
    './privacy-policy.component.responsive.scss',
  ],
})
export class PrivacyPolicyComponent {
  isRight = false;
  today = new Date();

  constructor(private router: Router, private scroll: ScrollService) {}

  goRight() {
    this.isRight = true;
    this.scroll.scrollTo('privacy-right');
  }

  goLeft() {
    this.isRight = false;
    this.scroll.scrollTo('privacy-left');
  }

  scrollToTopMobile() {
    this.scroll.scrollTo('privacy-left');
  }

  backToMain() {
    this.router.navigate(['/'], { fragment: 'about' });
  }

  onPrivacyClick(): void {
    this.isRight = false;
    const page = document.querySelector('.privacy-page') as HTMLElement | null;
    page?.scrollTo({ top: 0, behavior: 'smooth' });
    const left = document.getElementById('privacy-left');
    left?.scrollIntoView({ behavior: 'smooth' });
  }
}
