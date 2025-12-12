import { Component } from '@angular/core';
import { ScrollableSection } from '../../shared/scrollable-section.base';
import { ScrollService } from '../../services/scroll.service';
import { CommonModule } from '@angular/common';
import { TranslationPipe } from '../../shared/translation.pipe';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslationPipe],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss', './skills.component.responsive.scss'],
})
export class SkillsComponent extends ScrollableSection {
  override nextSectionId = 'my-work';
  constructor(scroll: ScrollService) {
    super(scroll);
  }
}
