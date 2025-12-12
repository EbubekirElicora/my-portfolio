import { Component } from '@angular/core';
import { ScrollableSection } from '../../shared/scrollable-section.base';
import { ScrollService } from '../../services/scroll.service';
import { CommonModule } from '@angular/common';
import { TranslationPipe } from '../../shared/translation.pipe';

@Component({
  selector: 'app-why-me',
  standalone: true,
  imports: [CommonModule, TranslationPipe],
  templateUrl: './why-me.component.html',
  styleUrls: ['./why-me.component.scss', './why-me.component.responsive.scss'],
})
export class WhyMeComponent extends ScrollableSection {
  override nextSectionId = 'skills';
  constructor(scroll: ScrollService) {
    super(scroll);
  }
}
