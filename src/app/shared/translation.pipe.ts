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

  transform(key: string, params?: Record<string, any>): string {
    const paramsKey = params ? JSON.stringify(params) : '';
    const cacheKey = `${this.currentLang}:${key}:${paramsKey}`;
    if (!this.cache.has(cacheKey)) {
      let value = this.lang.translateSync(key);
      if (params) {
        for (const [name, val] of Object.entries(params)) {
          const pattern = new RegExp(`{{\\s*${name}\\s*}}`, 'g');
          value = value.replace(pattern, String(val));
        }
      }
      this.cache.set(cacheKey, value);
    }
    return this.cache.get(cacheKey)!;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}