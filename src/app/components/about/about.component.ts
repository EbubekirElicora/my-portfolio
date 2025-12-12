import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollableSection } from '../../shared/scrollable-section.base';
import { ScrollService } from '../../services/scroll.service';
import { TranslationPipe } from '../../shared/translation.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslationPipe],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss', './about.component.responsive.scss'],
})
export class AboutComponent
  extends ScrollableSection
  implements AfterViewInit, OnDestroy
{
  @ViewChild('heroSection', { static: true })
  heroSection!: ElementRef<HTMLElement>;

  private heroObserver?: IntersectionObserver;
  override nextSectionId = 'why-me';
  constructor(scroll: ScrollService) {
    super(scroll);
  }

  ngAfterViewInit(): void {
    this.heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.heroObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    if (this.heroSection?.nativeElement) {
      this.heroObserver.observe(this.heroSection.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.heroObserver?.disconnect();
  }
}
