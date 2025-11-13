import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private languageService: LanguageService) {}

  setGerman(): void {
    this.languageService.setLanguage('de');
  }

  setEnglish(): void {
    this.languageService.setLanguage('en');
  }
}
