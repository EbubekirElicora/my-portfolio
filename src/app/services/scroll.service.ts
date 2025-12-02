import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {

  scrollTo(id: string): void {
    const target = this.getTarget(id);
    if (!target) return;

    if (this.isMobile()) {
      this.scrollToMobile(target);
    } else {
      this.scrollToDesktop(target);
    }
  }

  scrollToStart(): void {
    if (this.isMobile()) {
      this.scrollToFirstSectionMobile();
    } else {
      this.scrollContainerToStartDesktop();
    }
  }

  private isMobile(): boolean {
    return window.innerWidth <= 900;
  }

  private get container(): HTMLElement | null {
    return document.querySelector('.sections');
  }

  private getTarget(id: string): HTMLElement | null {
    return document.getElementById(id);
  }

  private scrollToDesktop(target: HTMLElement): void {
    const container = this.container;
    if (container) {
      const left = target.offsetLeft;
      container.scrollTo({
        left,
        behavior: 'smooth',
      });
    } else {
      this.scrollElementIntoView(target);
    }
  }

  private scrollContainerToStartDesktop(): void {
    const container = this.container;

    if (container) {
      container.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  private scrollToMobile(target: HTMLElement): void {
    this.scrollElementIntoView(target);
  }

  private scrollToFirstSectionMobile(): void {
    const firstSection = document.querySelector('.section') as HTMLElement | null;
    if (!firstSection) return;
    this.scrollElementIntoView(firstSection);
  }

  private scrollElementIntoView(target: HTMLElement): void {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
