import { Component } from '@angular/core';
import { ScrollableSection } from '../../shared/scrollable-section.base';
import { ScrollService } from '../../services/scroll.service';
import { CommonModule } from '@angular/common';
import { TranslationPipe } from '../../shared/translation.pipe';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule, TranslationPipe],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.scss',
})
export class MyProjectsComponent extends ScrollableSection {
  override nextSectionId = 'references';
  isProjectExpanded = [false, false, false];
  constructor(scroll: ScrollService) {
    super(scroll);
  }

  toggleProject(index: number): void {
    const wasOpen = this.isProjectExpanded[index];
    this.isProjectExpanded = this.isProjectExpanded.map(() => false);
    this.isProjectExpanded[index] = !wasOpen;
  }

  getProjectToggleLabel(index: number): string {
    return this.isProjectExpanded[index]
      ? 'work.toggle.less'
      : 'work.toggle.more';
  }
  getProjectToggleIcon(index: number): string {
    return this.isProjectExpanded[index]
      ? 'assets/img/icons/project_details/polygon_up.png'
      : 'assets/img/icons/project_details/polygon_down.png';
  }
}
