import { Injectable, signal } from '@angular/core';

export type AppLanguage = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly storageKey = 'selectedLanguage';

  readonly currentLanguage = signal<AppLanguage>(this.readStoredLanguage());

  setLanguage(language: AppLanguage): void {
    if (this.currentLanguage() === language) {
      return;
    }

    this.currentLanguage.set(language);
    localStorage.setItem(this.storageKey, language);
  }

  private readStoredLanguage(): AppLanguage {
    const stored = localStorage.getItem(this.storageKey);
    return stored === 'en' ? 'en' : 'es';
  }
}
