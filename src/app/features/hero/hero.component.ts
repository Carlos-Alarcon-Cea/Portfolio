import {
  Component,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

const LIGHT_MODE_IMAGES = [
  'img/Picture0.0-.png',
  'img/Picture0.1-.png',
  'img/Picture1-.png',
  'img/Picture2-.png',
  'img/Picture3-.png',
  'img/Picture4-.png',
  'img/Picture5-.png',
  'img/Picture6-.png',
  'img/Picture7-.png',
  'img/Picture8-.png',
  'img/Picture9-.png',
] as const;

const DARK_MODE_IMAGES = [
  'img/Picture0-dark.png',
  'img/Picture0.1-dark.png',
  'img/Picture1-dark.png',
  'img/Picture2-dark.png',
  'img/Picture3-dark.png',
  'img/Picture4-dark.png',
  'img/Picture5-dark.png',
  'img/Picture6-dark.png',
  'img/Picture7-dark.png',
  'img/Picture8-dark.png',
  'img/Picture9-dark.png',
] as const;

const DISCORD_TAG = 'Baggins#9264';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly themeService = inject(ThemeService);
  private slideshowTimer?: ReturnType<typeof setInterval>;

  private readonly currentIndex = signal(0);

  protected readonly profilePicture = computed(() => {
    const images = this.themeService.isLightMode()
      ? LIGHT_MODE_IMAGES
      : DARK_MODE_IMAGES;
    return images[this.currentIndex() % images.length];
  });

  ngOnInit(): void {
    this.slideshowTimer = setInterval(() => {
      this.currentIndex.update((index) => index + 1);
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.slideshowTimer) {
      clearInterval(this.slideshowTimer);
    }
  }

  protected async copyDiscord(event: Event): Promise<void> {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(DISCORD_TAG);
    } catch {
      // Clipboard may be unavailable depending on browser permissions.
    }
  }
}
