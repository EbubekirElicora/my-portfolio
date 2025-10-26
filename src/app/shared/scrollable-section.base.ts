import { ScrollService } from '../services/scroll.service';
import { NavigableSection } from '../interfaces/interface/interface';


export abstract class ScrollableSection  implements NavigableSection {
  abstract nextSectionId: string;
  constructor(protected scroll: ScrollService) {}
  onNext(ev?: KeyboardEvent): void {
    if (ev) ev.preventDefault();
    if (!this.nextSectionId) return;
    this.scroll.scrollTo(this.nextSectionId);
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