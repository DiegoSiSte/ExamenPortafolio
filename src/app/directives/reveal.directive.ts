import {
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnDestroy {
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly observer: IntersectionObserver | null = null;

  constructor() {
    const platformId = inject(PLATFORM_ID);
    const element = this.element.nativeElement;

    if (
      !isPlatformBrowser(platformId) ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return;
    }

    this.renderer.addClass(element, 'translate-y-6');
    this.renderer.addClass(element, 'opacity-0');
    this.renderer.addClass(element, 'transition-all');
    this.renderer.addClass(element, 'duration-700');
    this.renderer.addClass(element, 'ease-out');

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.renderer.removeClass(element, 'translate-y-6');
            this.renderer.removeClass(element, 'opacity-0');
            this.observer?.unobserve(element);
          }
        }
      },
      { threshold: 0.12 },
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
