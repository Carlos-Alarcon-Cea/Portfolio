import { ViewportScroller } from '@angular/common';
import {
  Component,
  HostListener,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { ThemeService } from '../../core/services/theme.service';

type NavSection = 'Home' | 'Projects' | 'About';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  protected readonly themeService = inject(ThemeService);
  protected readonly languageService = inject(LanguageService);
  private readonly viewportScroller = inject(ViewportScroller);

  protected readonly menuOpen = signal(false);
  protected readonly isMobile = signal(false);
  protected readonly activeSection = signal<NavSection>('Home');

  ngOnInit(): void {
    this.viewportScroller.setOffset([0, 80]);
    this.updateLayout(window.innerWidth);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateLayout(window.innerWidth);
  }

  protected openMenu(): void {
    this.menuOpen.set(true);
    document.body.classList.add('no-scroll');
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
    document.body.classList.remove('no-scroll');
  }

  protected scrollToSection(section: NavSection, event: Event): void {
    event.preventDefault();
    this.activeSection.set(section);
    this.viewportScroller.scrollToAnchor(section);
    this.closeMenu();
  }

  protected setLanguage(language: 'es' | 'en'): void {
    this.languageService.setLanguage(language);
  }

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  private updateLayout(width: number): void {
    const mobile = width <= 768;
    this.isMobile.set(mobile);

    if (!mobile) {
      this.closeMenu();
    }
  }
}
