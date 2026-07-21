import { Component } from '@angular/core';
import { HeroComponent } from '../../features/hero/hero.component';
import { NavbarComponent } from '../../features/navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
