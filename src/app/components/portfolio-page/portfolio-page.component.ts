import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SideNavComponent } from '../side-nav/side-nav.component';
import { WhyMeComponent } from '../why-me/why-me.component';
import { SkillsComponent } from '../skills/skills.component';
import { MyProjectsComponent } from '../my-projects/my-projects.component';
import { ReferencesComponent } from '../references/references.component';
import { ContactComponent } from '../contact/contact.component';
import { LegalComponent } from '../legal/legal.component';
import { AboutComponent } from '../about/about.component';
import { AccentBarComponent } from '../../accent-bar/accent-bar.component';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [
    CommonModule, RouterModule, SideNavComponent,
    AboutComponent, WhyMeComponent, SkillsComponent,
    MyProjectsComponent, ReferencesComponent, ContactComponent, LegalComponent, AccentBarComponent
  ],
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss']
})
export class PortfolioPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sectionsContainer', { static: true }) sectionsContainer!: ElementRef<HTMLDivElement>;
  private removeListeners: Array<() => void> = [];

  constructor(private host: ElementRef<HTMLElement>, private r: Renderer2) {}

  ngAfterViewInit(): void {
    const container = this.sectionsContainer.nativeElement;

    // Mausrad -> horizontal scrollen
    const onWheel = (ev: WheelEvent) => {
      ev.preventDefault();
      container.scrollBy({ left: ev.deltaY, behavior: 'auto' });
    };
    container.addEventListener('wheel', onWheel, { passive: false });
    this.removeListeners.push(() => container.removeEventListener('wheel', onWheel));

    // SideNav-Verlinkungen (anchors mit .nav-link)
    const navLinks = this.host.nativeElement.querySelectorAll('.side-nav .nav-link') as NodeListOf<HTMLAnchorElement>;
    navLinks.forEach(a => {
      const off = this.r.listen(a, 'click', (e: Event) => {
        e.preventDefault();
        const id = a.getAttribute('href')?.slice(1);
        if (!id) return;
        const target = this.host.nativeElement.querySelector<HTMLElement>('#' + id);
        if (target) container.scrollTo({ left: target.offsetLeft, top: 0, behavior: 'smooth' });
        this.updateActive(a.getAttribute('href')!);
      });
      this.removeListeners.push(off);
    });

    // Pfeile .next-arrow data-target="#id"
    const arrows = this.host.nativeElement.querySelectorAll('.next-arrow') as NodeListOf<HTMLElement>;
    arrows.forEach(btn => {
      const off = this.r.listen(btn, 'click', () => {
        const id = btn.getAttribute('data-target')?.slice(1);
        if (!id) return;
        const target = this.host.nativeElement.querySelector<HTMLElement>('#' + id);
        if (target) container.scrollTo({ left: target.offsetLeft, top: 0, behavior: 'smooth' });
      });
      this.removeListeners.push(off);
    });

    // aktiver Navpunkt beim Scrollen
    const onScroll = () => this.syncActiveLink();
    container.addEventListener('scroll', onScroll);
    this.removeListeners.push(() => container.removeEventListener('scroll', onScroll));
  }

  ngOnDestroy(): void {
    this.removeListeners.forEach(off => off());
    this.removeListeners = [];
  }

  private syncActiveLink() {
    const container = this.sectionsContainer.nativeElement;
    const sections = Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>('.section'));
    const x = container.scrollLeft;
    let bestId = sections[0]?.id; let best = Number.POSITIVE_INFINITY;
    for (const s of sections) {
      const d = Math.abs(s.offsetLeft - x);
      if (d < best) { best = d; bestId = s.id; }
    }
    if (bestId) this.updateActive('#' + bestId);
  }

  private updateActive(hash: string) {
    const links = this.host.nativeElement.querySelectorAll('.side-nav .nav-link') as NodeListOf<HTMLAnchorElement>;
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === hash));
  }
}
