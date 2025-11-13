// src/app/sections/about/about.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollableSection } from '../../shared/scrollable-section.base';
import { ScrollService } from '../../services/scroll.service';
import { TranslationPipe } from '../../shared/translation.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslationPipe],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent extends ScrollableSection {
  override nextSectionId = 'why-me';
  constructor(scroll: ScrollService) {
    super(scroll);
  }
}