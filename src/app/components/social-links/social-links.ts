import { ChangeDetectionStrategy, Component } from '@angular/core';
import { profile } from '../../data/profile';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './social-links.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinksComponent {
  protected readonly socialLinks = profile.socialLinks;
}
