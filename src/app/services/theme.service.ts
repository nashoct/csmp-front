import { Injectable } from '@angular/core';

const STORAGE_KEY = 'csmp-theme';
const DARK_CLASS = 'ion-palette-dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private dark = false;

  /** Applies the stored preference, falling back to the OS setting. */
  initialize(): void {
    const stored = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    this.setDark(stored ? stored === 'dark' : prefersDark);
  }

  toggle(): void {
    this.setDark(!this.dark);
  }

  get isDark(): boolean {
    return this.dark;
  }

  private setDark(dark: boolean): void {
    this.dark = dark;
    document.documentElement.classList.toggle(DARK_CLASS, dark);
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
  }
}
