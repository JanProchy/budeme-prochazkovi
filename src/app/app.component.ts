import { CommonModule } from '@angular/common';
import {
  afterEveryRender,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LightDarkSwitcherComponent } from './light-dark-switcher/light-dark-switcher.component';
import { WeddingBackgroundComponent } from './wedding-background/wedding-background.component';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
import { FcmService } from './services/fcm.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    WeddingBackgroundComponent,
    LightDarkSwitcherComponent,
    ContactDialogComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'Budeme Procházkovi!';

  themeDetected = signal(false);

  dialogOpen = signal(false);

  constructor(private fcmService: FcmService) {
    afterEveryRender(() => {
      if (window.matchMedia && this.themeDetected() === false) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.body.classList.add('dark-mode');
        }
        this.themeDetected.set(true);
      }
    });

    const style =
      'background-color: green; color: white; border: 5px solid lime; font-size: 2em; padding-inline: 1rem;';
    console.log(
      "%cHezky! Zajdi za námi na svatbě s kódem 'IDDQD' a dostaneš panáka zdarma!",
      style
    );
    this.fcmService.requestPermissionAndGetToken();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      document.body.classList.add('content-loaded');
    }, 1_500);
  }
}
