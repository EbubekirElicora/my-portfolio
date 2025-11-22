import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private get container(): HTMLElement | null {
    return document.querySelector('.sections');
  }

  scrollTo(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
  }

  scrollToStart() {
    this.container?.scrollTo({ left: 0, behavior: 'smooth' });
  }
}
