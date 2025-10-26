import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  activeLink = ''; 

  constructor(private scroll: ScrollService) {}

  onNav(sectionId: string) {
    this.scroll.scrollTo(sectionId);
    this.activeLink = sectionId;
  }
}
