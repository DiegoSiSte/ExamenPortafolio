import { ChangeDetectionStrategy, Component } from '@angular/core';
import { profile } from '../../data/profile';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  protected readonly profile = profile;

  protected get socialLinks(): { label: string; href: string }[] {
    return [
      { label: 'GitHub', href: this.profile.contact.github },
      { label: 'LinkedIn', href: this.profile.contact.linkedin },
    ].filter((link) => link.href.length > 0);
  }
}
