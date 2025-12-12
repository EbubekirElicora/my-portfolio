import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ScrollableSection } from '../../shared/scrollable-section.base';
import { ScrollService } from '../../services/scroll.service';
import { CommonModule } from '@angular/common';
import { TranslationPipe } from '../../shared/translation.pipe';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule, TranslationPipe],
  templateUrl: './references.component.html',
  styleUrls: [
    './references.component.scss',
    './references.component.responsive.scss',
  ],
})
export class ReferencesComponent
  extends ScrollableSection
  implements AfterViewInit
{
  override nextSectionId = 'contact';

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  activeRef = 0;

  private readonly indicatorImages = [
    'assets/img/icons/carousel/first_ref.png',
    'assets/img/icons/carousel/second_ref.png',
    'assets/img/icons/carousel/third_ref.png',
  ];

  get indicatorSrc(): string {
    return this.indicatorImages[this.activeRef] || this.indicatorImages[0];
  }

  constructor(scroll: ScrollService) {
    super(scroll);
  }

  ngAfterViewInit(): void {
    const el = this.scrollContainer.nativeElement;
  }

  onRefsScroll(event: Event): void {
    const el = event.target as HTMLElement;
    const width = el.clientWidth || 1;
    const index = Math.round(el.scrollLeft / width);
    this.activeRef = Math.min(2, Math.max(0, index));
  }
}
