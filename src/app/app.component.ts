import { CommonModule } from '@angular/common';
import { afterRender, AfterViewInit, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LightDarkSwitcherComponent } from './light-dark-switcher/light-dark-switcher.component';
import { WeddingBackgroundComponent } from './wedding-background/wedding-background.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    WeddingBackgroundComponent,
    LightDarkSwitcherComponent,
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
            <p>Penzion Pluhův Žďár</p>
            <p>Mapa zde.</p>
            <p>informace o parkování</p>
          </div>

          <div class="event-card">
            <h2>Kdy</h2>
            <p>16. srpna 2025 od 10 hodin</p>
            <p>Obřad od 12 hodin.</p>
          </div>

          <div class="event-card">
            <h2>Jídelníček</h2>
            <p>12:00 - Vývar & guláš</p>
            <p>13:00 - Slivovice</p>
          </div>
        </div>

        <button class="rsvp-button">Zanechat vzkaz</button>
      </div>
    </main>
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
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 4rem 1rem;
        max-width: 64rem;
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

      .rsvp-button {
        background-color: #047857;
        color: white;
        font-weight: 700;
        padding: 0.75rem 2rem;
        border-radius: 9999px;
        font-size: 1.125rem;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: #065f46;
        }
      }

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
