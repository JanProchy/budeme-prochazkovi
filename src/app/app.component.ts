import { CommonModule } from '@angular/common';
import { afterRender, AfterViewInit, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LightDarkSwitcherComponent } from './light-dark-switcher/light-dark-switcher.component';
import { WeddingBackgroundComponent } from './wedding-background/wedding-background.component';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';

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
  template: `
    <app-wedding-background></app-wedding-background>

    <main class="wedding-content">
      <div class="theme-switcher">
        <app-light-dark-switcher></app-light-dark-switcher>
      </div>

      <div class="spacer top"></div>
      <div class="content-container">
        <h1 class="title">Natálie & Jan</h1>

        <p class="subtitle">budeme Procházkovi!</p>

        <div class="date">16. srpna 2025</div>

        <div class="event-cards">
          <div class="event-card">
            <h2>Kde</h2>
            <p>Pluhův Žďár</p>
            <p>Penzion u Zámku</p>
            <a href="https://maps.app.goo.gl/HPpjzqGzX5128tsYA" target="_blank"
              >Odkaz na mapu</a
            >
          </div>

          <div class="event-card">
            <h2>Harmonogram</h2>
            <p><span class="time-span">9:30 - 10:30</span> — Příjezd hostů</p>
            <p><span class="time-span">11:00</span> — Obřad</p>
            <p><span class="time-span">12:30</span> — Společný oběd</p>
            <p><span class="time-span">16:00</span> — Krájení dortu s kávou</p>
            <p>
              <span class="time-span">17:00</span> — První novomanželský tanec
            </p>
            <p><span class="time-span">18:30</span> — Raut</p>
            <p><span class="time-span">22:00</span> — Tanec s prskavkami</p>
          </div>

          <div class="event-card">
            <h2>Jídelníček</h2>
            <p>Bude doplněno</p>

            <h2>Ostatní</h2>
            <p>Dresscode</p>
            <ul>
              <li>Zelená</li>
              <li>Eucalyptus & Šalvěj</li>
            </ul>
            <p>Dary</p>
            <ul>
              <li>Už máme jeden druhého, to nám stačí :-)</li>
              <li>Nejvděčnější budeme za obálky</li>
            </ul>
          </div>
        </div>

        <button class="rsvp-button" (click)="dialogOpen.set(true)">
          Zanechat vzkaz
        </button>

        <p class="contact-us">
          Pokud máte nějaké dotazy, neváhejte se na nás obrátit.<br />
          <a href="mailto:jan.prochy@gmail.com">jan.prochy&#64;gmail.com</a>
        </p>
      </div>
    </main>

    <app-contact-dialog
      [opened]="dialogOpen()"
      (close)="dialogOpen.set(false)"
    ></app-contact-dialog>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
      }

      .wedding-content {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        position: relative;
        flex-wrap: wrap;
        z-index: 10;
      }

      .spacer {
        &.top {
          height: 100px;
        }
      }

      .theme-switcher {
        position: absolute;
        top: 1rem;
        right: 1rem;
      }

      .content-container {
        opacity: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 4rem 1rem;
        max-width: 65rem;
        margin: 0 auto;
      }

      .title {
        font-size: 3rem;
        font-weight: 300;
        color: #047857;
        margin-bottom: 1rem;
        font-family: 'Playfair Display', serif;
      }

      .subtitle {
        font-size: 1.25rem;
        font-weight: 300;
        color: #059669;
        margin-bottom: 2rem;
      }

      .date {
        font-size: 1.875rem;
        font-family: 'Playfair Display', serif;
        color: #064e3b;
        margin-bottom: 3rem;
      }

      .event-cards {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        margin-bottom: 4rem;
      }

      .event-card {
        background-color: rgba(255, 255, 255, 0.7);
        padding: 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

        h2 {
          font-size: 1.5rem;
          font-family: 'Playfair Display', serif;
          color: #047857;
          margin-bottom: 1rem;
          text-align: center;
          margin-top: 0;
        }
        p {
          color: #064e3b;
        }
      }

      // .rsvp-button {
      //   background-color: #047857;
      //   color: white;
      //   font-weight: 700;
      //   padding: 0.75rem 2rem;
      //   border-radius: 9999px;
      //   font-size: 1.125rem;
      //   border: none;
      //   cursor: pointer;
      //   transition: background-color 0.2s;

      //   &:hover {
      //     background-color: #065f46;
      //   }
      // }

      @media (min-width: 768px) {
        .spacer.top {
          height: 200px;
        }

        .title {
          font-size: 5.5rem;
        }

        .subtitle {
          font-size: 1.7rem;
          font-weight: 400;
        }

        .date {
          font-size: 2.25rem;
        }

        .event-cards {
          grid-template-columns: repeat(3, 1fr);
        }
      }
    `,
  ],
})
export class AppComponent implements AfterViewInit {
  title = 'Budeme Procházkovi!';

  themeDetected = signal(false);

  dialogOpen = signal(false);

  constructor() {
    afterRender(() => {
      if (window.matchMedia && this.themeDetected() === false) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.body.classList.add('dark-mode');
        }
        this.themeDetected.set(true);
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      document.body.classList.add('content-loaded');
    }, 1_500);
  }
}
