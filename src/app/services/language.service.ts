import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type LanguageCode = 'de' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly storageKey = 'preferredLanguage';
  private readonly language$ = new BehaviorSubject<LanguageCode>(
    this.initLanguage()
  );
  currentLanguage$ = this.language$.asObservable();
  private translations: Partial<Record<LanguageCode, any>> = {};
  private inFlight: Partial<Record<LanguageCode, Promise<void>>> = {};

  constructor() {
    void this.ensureLoaded(this.language$.value)
      .then(() => this.language$.next(this.language$.value))
      .catch((err) =>
        console.error('Übersetzungen konnten nicht geladen werden:', err)
      );
  }

  private initLanguage(): LanguageCode {
    const saved =
      (localStorage.getItem(this.storageKey) as LanguageCode) || 'de';
    document.documentElement.lang = saved;
    return saved;
  }

  async setLanguage(language: LanguageCode): Promise<void> {
    if (language === this.language$.value) return;
    await this.ensureLoaded(language);
    this.language$.next(language);
    localStorage.setItem(this.storageKey, language);
    document.documentElement.lang = language;
  }

  private async ensureLoaded(language: LanguageCode): Promise<void> {
    if (this.translations[language]) return;
    if (this.inFlight[language]) {
      await this.inFlight[language]!;
      return;
    }
    this.inFlight[language] = fetch(`assets/jSon/translations/${language}.json`)
      .then((r) => r.json())
      .then((json) => {
        this.translations[language] = json;
      })
      .finally(() => {
        delete this.inFlight[language];
      });
    await this.inFlight[language]!;
  }

  translateSync(key: string): string {
    const lang = this.language$.value;
    const dict = this.translations[lang];
    if (!dict) return key;
    return (
      key
        .split('.')
        .reduce<any>((acc, part) => (acc ? acc[part] : undefined), dict) ?? key
    );
  }
}
