import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  links = [
    { label: 'Why me',  href: '#why-me'  },
    { label: 'Skills',  href: '#skills'  },
    { label: 'My Work', href: '#my-work' },
    { label: 'Contact', href: '#contact' }
  ];
}
