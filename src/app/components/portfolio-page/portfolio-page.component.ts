import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { WhyMeComponent } from '../why-me/why-me.component';
import { SkillsComponent } from '../skills/skills.component';
import { MyProjectsComponent } from '../my-projects/my-projects.component';
import { ReferencesComponent } from '../references/references.component';
import { ContactComponent } from '../contact/contact.component';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SideNavComponent,
    AboutComponent,
    WhyMeComponent,
    SkillsComponent,
    MyProjectsComponent,
    ReferencesComponent,
    ContactComponent,
  ],
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss'],
})
export class PortfolioPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sectionsContainer', { static: true })
  sectionsContainer!: ElementRef<HTMLDivElement>;
  private removeListeners: Array<() => void> = [];
  constructor(private host: ElementRef<HTMLElement>, private r: Renderer2) {}

  ngAfterViewInit(): void {
    const container = this.sectionsContainer.nativeElement;
    this.initWheelScroll(container);
    this.initNavLinks(container);
    this.initArrows(container);
    this.initScrollSync(container);
  }

  ngOnDestroy(): void {
    this.removeListeners.forEach((off) => off());
    this.removeListeners = [];
  }

  private initWheelScroll(container: HTMLDivElement): void {
    const onWheel = this.createWheelHandler(container);
    container.addEventListener('wheel', onWheel, { passive: false });
    this.removeListeners.push(() =>
      container.removeEventListener('wheel', onWheel)
    );
  }

  private createWheelHandler(container: HTMLDivElement) {
    const speedFactor = 2.5;
    return (ev: WheelEvent) => {
      if (window.innerWidth <= 799) return;
      ev.preventDefault();
      container.scrollBy({
        left: ev.deltaY * speedFactor,
        behavior: 'auto',
      });
    };
  }

  private initNavLinks(container: HTMLDivElement): void {
    const navLinks = this.host.nativeElement.querySelectorAll(
      '.side-nav .nav-link'
    ) as NodeListOf<HTMLAnchorElement>;
    navLinks.forEach((link) => {
      const off = this.r.listen(link, 'click', (event: Event) => {
        event.preventDefault();
        const href = link.getAttribute('href');
        if (!href) return;
        const id = href.slice(1);
        if (!id) return;
        this.scrollToSectionById(id, container);
        this.updateActive(href);
      });
      this.removeListeners.push(off);
    });
  }

  private initArrows(container: HTMLDivElement): void {
    const arrows = this.host.nativeElement.querySelectorAll(
      '.next-arrow'
    ) as NodeListOf<HTMLElement>;
    arrows.forEach((btn) => {
      const off = this.r.listen(btn, 'click', () => {
        const id = btn.getAttribute('data-target')?.slice(1);
        if (!id) return;
        this.scrollToSectionById(id, container);
      });
      this.removeListeners.push(off);
    });
  }

  private initScrollSync(container: HTMLDivElement): void {
    const onScroll = () => this.syncActiveLink(container.scrollLeft);
    container.addEventListener('scroll', onScroll);
    this.removeListeners.push(() =>
      container.removeEventListener('scroll', onScroll)
    );
  }

  private scrollToSectionById(id: string, container: HTMLDivElement): void {
    const target = this.getSectionById(id);
    if (!target) return;
    container.scrollTo({
      left: target.offsetLeft,
      top: 0,
      behavior: 'smooth',
    });
  }

  private getSectionById(id: string): HTMLElement | null {
    return this.host.nativeElement.querySelector<HTMLElement>('#' + id);
  }

  private getSections(): HTMLElement[] {
    return Array.from(
      this.host.nativeElement.querySelectorAll<HTMLElement>('.section')
    );
  }

  private syncActiveLink(scrollLeft: number): void {
    const sections = this.getSections();
    const bestId = this.findClosestSectionId(sections, scrollLeft);
    if (bestId) {
      this.updateActive('#' + bestId);
    }
  }

  private findClosestSectionId(
    sections: HTMLElement[],
    scrollLeft: number
  ): string | undefined {
    let bestId: string | undefined = sections[0]?.id;
    let bestDistance = Number.POSITIVE_INFINITY;
    for (const section of sections) {
      const distance = Math.abs(section.offsetLeft - scrollLeft);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestId = section.id;
      }
    }
    return bestId;
  }

  private updateActive(hash: string): void {
    const links = this.host.nativeElement.querySelectorAll(
      '.side-nav .nav-link'
    ) as NodeListOf<HTMLAnchorElement>;
    links.forEach((link) => {
      const isActive = link.getAttribute('href') === hash;
      link.classList.toggle('active', isActive);
    });
  }
}
