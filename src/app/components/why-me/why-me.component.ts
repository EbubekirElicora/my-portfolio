import { Component } from '@angular/core';
import { ScrollableSection } from '../../shared/scrollable-section.base';
import { ScrollService } from '../../services/scroll.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-me.component.html',
  styleUrl: './why-me.component.scss'
})
export class WhyMeComponent extends ScrollableSection {
  override nextSectionId = 'skills';
  constructor(scroll: ScrollService) { super(scroll); }
}
