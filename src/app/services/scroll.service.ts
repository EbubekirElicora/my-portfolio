import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  scrollTo(id: string) {
    const container = document.querySelector<HTMLElement>('.sections');
    const target = document.getElementById(id);
    if (container && target) {
      container.scrollTo({ left: target.offsetLeft, top: 0, behavior: 'smooth'});
    }
  }
}