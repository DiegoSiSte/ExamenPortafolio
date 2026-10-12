import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { profile } from '../../data/profile';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  protected readonly profile = profile;
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);

  @HostListener('window:scroll')
  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 16);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
