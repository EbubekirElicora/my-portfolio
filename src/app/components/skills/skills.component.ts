import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  icon: string;
}

/**
 * Skills component displays a set of skills with icons. Each skill
 * consists of a name and the path to its icon. Replace the sample
 * skills array with icons exported from your Figma design and update
 * the names accordingly.
 */
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  /** Array of skills to display. Replace with real data. */
  skills: Skill[] = [
    { name: 'Angular', icon: '/assets/img/skill/angular.png' },
    { name: 'TypeScript', icon: '/assets/img/skill/typescript.png' },
    { name: 'CSS', icon: '/assets/img/skill/css.png' },
    { name: 'Git', icon: '/assets/img/skill/git.png' }
  ];
}