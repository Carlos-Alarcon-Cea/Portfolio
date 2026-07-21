import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'theme';

  readonly isLightMode = signal(this.readStoredTheme() === 'light');

  constructor() {
    this.applyTheme(this.isLightMode());
  }

  toggleTheme(): void {
    const nextIsLight = !this.isLightMode();
    this.isLightMode.set(nextIsLight);
    this.applyTheme(nextIsLight);
    localStorage.setItem(this.storageKey, nextIsLight ? 'light' : 'dark');
  }

  private applyTheme(isLight: boolean): void {
    this.document.documentElement.classList.toggle('light-mode', isLight);
  }

  private readStoredTheme(): ThemeMode {
    const stored = localStorage.getItem(this.storageKey);
    return stored === 'light' ? 'light' : 'dark';
  }
}
