import { Component } from '@angular/core';
import { ScrollableSection } from '../../shared/scrollable-section.base';
import { ScrollService } from '../../services/scroll.service';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule,SideNavComponent],
  templateUrl: './legal.component.html',
  styleUrl: './legal.component.scss'
})
export class LegalComponent extends ScrollableSection {
  override nextSectionId = 'About';
  constructor(scroll: ScrollService) { super(scroll); }
}