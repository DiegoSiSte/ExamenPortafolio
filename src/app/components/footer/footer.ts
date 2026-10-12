import { ChangeDetectionStrategy, Component } from '@angular/core';
import { profile } from '../../data/profile';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly profile = profile;
  protected readonly year = new Date().getFullYear();
}
