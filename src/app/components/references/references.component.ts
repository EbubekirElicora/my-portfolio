import { Component } from '@angular/core';
import { ScrollableSection } from '../../shared/scrollable-section.base';
import { ScrollService } from '../../services/scroll.service';
import { CommonModule } from '@angular/common';
import { TranslationPipe } from '../../shared/translation.pipe';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule, TranslationPipe],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss',
})
export class ReferencesComponent extends ScrollableSection {
  override nextSectionId = 'contact';
  constructor(scroll: ScrollService) {
    super(scroll);
  }
}