import { Component } from '@angular/core';
import { ScrollableSection } from '../../shared/scrollable-section.base';
import { ScrollService } from '../../services/scroll.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './legal.component.html',
  styleUrl: './legal.component.scss'
})
export class LegalComponent extends ScrollableSection {
  override nextSectionId = 'home';
  constructor(scroll: ScrollService) { super(scroll); }
}