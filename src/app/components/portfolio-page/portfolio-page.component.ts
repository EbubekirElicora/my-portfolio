import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SkillsComponent } from '../skills/skills.component';
import { ReferencesComponent } from '../references/references.component';
import { ContactComponent } from '../contact/contact.component';
import { LegalComponent } from '../legal/legal.component';
import { WhyMeComponent } from '../why-me/why-me.component';
import { MyProjectsComponent } from '../my-projects/my-projects.component';
import { SideNavComponent } from '../../shared/side-nav/side-nav.component';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [
    CommonModule, RouterModule, SideNavComponent,
    AboutComponent, WhyMeComponent, SkillsComponent, MyProjectsComponent, ReferencesComponent, ContactComponent, LegalComponent
  ],
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss']
})
export class PortfolioPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sectionsContainer', { static: true }) sectionsContainer!: ElementRef<HTMLDivElement>;
  private removeListeners: Array<() => void> = [];

  constructor(private host: ElementRef, private r: Renderer2) {}

  ngAfterViewInit(): void {
    // Side-Nav: horizontales Scrollen
    const navLinks = this.host.nativeElement.querySelectorAll('.side-nav .nav-link');
    navLinks.forEach((a: HTMLAnchorElement) => {
      const off = this.r.listen(a, 'click', (ev: Event) => {
        ev.preventDefault();
        const targetId = a.getAttribute('href')?.replace('#', '');
        this.scrollToSectionId(targetId);
      });
      this.removeListeners.push(off);
    });

    // Next-Arrow Buttons: data-target="#id"
    const arrows = this.host.nativeElement.querySelectorAll('.next-arrow');
    arrows.forEach((btn: HTMLElement) => {
      const off = this.r.listen(btn, 'click', () => {
        const target = btn.getAttribute('data-target')?.replace('#', '');
        this.scrollToSectionId(target);
      });
      this.removeListeners.push(off);
    });

    // Active-Link beim Scrollen synchronisieren
    const container = this.sectionsContainer.nativeElement;
    const offScroll = this.r.listen(container, 'scroll', () => this.syncActiveLink());
    this.removeListeners.push(offScroll);
  }

  ngOnDestroy(): void {
    this.removeListeners.forEach(off => off());
    this.removeListeners = [];
  }

  private scrollToSectionId(id?: string | null) {
    if (!id) return;
    const container = this.sectionsContainer.nativeElement;
    const target = this.host.nativeElement.querySelector('#' + id) as HTMLElement | null;
    if (!target) return;
    container.scrollTo({ left: target.offsetLeft, top: 0, behavior: 'smooth' });
    this.updateActiveNav('#' + id);
  }

  private syncActiveLink() {
    const container = this.sectionsContainer.nativeElement;
    const sections = Array.from(this.host.nativeElement.querySelectorAll('.section')) as HTMLElement[];
    const left = container.scrollLeft;
    let bestId = sections[0]?.id;
    let best = Number.POSITIVE_INFINITY;
    for (const s of sections) {
      const d = Math.abs(s.offsetLeft - left);
      if (d < best) { best = d; bestId = s.id; }
    }
    if (bestId) this.updateActiveNav('#' + bestId);
  }

  private updateActiveNav(hash: string) {
    const navLinks = this.host.nativeElement.querySelectorAll('.side-nav .nav-link');
    navLinks.forEach((a: HTMLAnchorElement) => {
      a.classList.toggle('active', a.getAttribute('href') === hash);
    });
  }
}
