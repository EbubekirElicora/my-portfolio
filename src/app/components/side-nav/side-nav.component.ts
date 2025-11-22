import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { TranslationPipe } from '../../shared/translation.pipe';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, TranslationPipe],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  activeLink = '';
  isMenuOpen = false;

  @ViewChild('mobileMenu') mobileMenu?: ElementRef<HTMLElement>;
  @ViewChild('burgerBtn') burgerBtn?: ElementRef<HTMLElement>;

  constructor(
    private scroll: ScrollService,
    private languageService: LanguageService) {}

  onNav(sectionId: string) {
    this.scroll.scrollTo(sectionId);
    this.activeLink = sectionId;
    this.isMenuOpen = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isMenuOpen) return;
    const target = event.target as HTMLElement;
    const menuEl = this.mobileMenu?.nativeElement;
    const burgerEl = this.burgerBtn?.nativeElement;
    if (menuEl?.contains(target) || burgerEl?.contains(target)) {
      return;
    }
    this.closeMenu();
  }

  setGerman(): void {
    this.languageService.setLanguage('de');
  }

  setEnglish(): void {
    this.languageService.setLanguage('en');
  }
}
