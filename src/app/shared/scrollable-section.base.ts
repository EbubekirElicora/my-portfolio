import { ScrollService } from '../services/scroll.service';

export abstract class ScrollableSection {
  abstract nextSectionId: string;
  protected backTargetId?: string; 

  constructor(protected scroll: ScrollService) {}

  onNext(): void {
    if (this.nextSectionId) this.scroll.scrollTo(this.nextSectionId);
  }

  onBack(): void {
    if (this.backTargetId) this.scroll.scrollTo(this.backTargetId);
    else this.scroll.scrollToStart();
  }

  onKey(ev: KeyboardEvent): void {
    const isEnter = ev.key === 'Enter';
    const isSpace = ev.key === ' ' || ev.code === 'Space';
    if (isEnter || isSpace) {
      ev.preventDefault();
      this.onNext();
    }
  }
}
