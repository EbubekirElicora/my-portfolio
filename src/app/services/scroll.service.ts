// src/app/services/scroll.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private get container(): HTMLElement | null {
    return document.querySelector('.sections');
  }

  // scrollt zu bestimmter Section
  scrollTo(id: string) {
    const target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start' // horizontal an Anfang der Section
    });
  }

  // zurück zur ersten Section
  scrollToStart() {
    this.container?.scrollTo({ left: 0, behavior: 'smooth' });
  }
}
