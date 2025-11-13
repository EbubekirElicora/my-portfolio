import {
  ChangeDetectorRef,
  Pipe,
  PipeTransform,
  OnDestroy,
} from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Subscription } from 'rxjs';

@Pipe({ name: 'translate', standalone: true, pure: false })
export class TranslationPipe implements PipeTransform, OnDestroy {
  private sub: Subscription;
  private cache = new Map<string, string>();
  private currentLang = 'de';

  constructor(private lang: LanguageService, private cdr: ChangeDetectorRef) {
    this.sub = this.lang.currentLanguage$.subscribe((language) => {
      this.currentLang = language;
      this.cache.clear();
      this.cdr.markForCheck();
    });
  }

  transform(key: string): string {
    const cacheKey = `${this.currentLang}:${key}`;
    if (!this.cache.has(cacheKey)) {
      this.cache.set(cacheKey, this.lang.translateSync(key));
    }
    return this.cache.get(cacheKey)!;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
