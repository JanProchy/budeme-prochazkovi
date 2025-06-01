import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-light-dark-switcher',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './light-dark-switcher.component.html',
  styles: [
    `
      :host {
        display: block;
        width: 48px;
        aspect-ratio: 1;
        cursor: pointer;
      }

      #color-theme-icon {
        color: #047857;
      }
    `,
  ],
  host: {
    '(click)': 'toggleTheme()',
  },
})
export class LightDarkSwitcherComponent {
  toggleTheme() {
    document.body.classList.toggle('dark-mode');
  }
}
