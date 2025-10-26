import { Component } from '@angular/core';
import { ScrollableSection } from '../../shared/scrollable-section.base';
import { ScrollService } from '../../services/scroll.service';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent extends ScrollableSection {
  override nextSectionId = 'my-work';
  constructor(scroll: ScrollService) { super(scroll); }

  skills: Skill[] = [
    { name: 'Angular', icon: '/assets/img/skill/angular.png' },
    { name: 'TypeScript', icon: '/assets/img/skill/typescript.png' },
    { name: 'CSS', icon: '/assets/img/skill/css.png' },
    { name: 'Git', icon: '/assets/img/skill/git.png' }
  ];
}