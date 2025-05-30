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
            <h2>Místo svatby</h2>
            <p>Penzion U Zámku</p>
            <p>Pluhův Žďár 1</p>
            <p>378 24 Pluhův Žďár</p>
            <a href="https://maps.app.goo.gl/HPpjzqGzX5128tsYA" target="_blank"
              >Odkaz na mapu</a
            >
          </div>

          <div class="event-card">
            <h2>Plán dne</h2>
            <p><span class="time-span">do 10:30</span> — Příjezd hostů</p>
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
            <h2>Menu</h2>
            <span class="label">Polévka</span>
            <p id="soup">Svatební vývar</p>

            <span class="label">Hlavní chod</span>
            <p id="main-course">
              Vepřová panenka se štouchaným bramborem a grilovanou zeleninou
            </p>

            <span class="label">Pro děti</span>
            <p id="main-course">
              Kuřecí plátek se štouchaným bramborem a grilovanou zeleninou
            </p>

            <span class="label">Večeře</span>
            <p id="supper">Raut</p>
          </div>
        </div>

        <h3>Milí svatebčané,</h3>
        <p class="about-wedding">
          Jestli si snad někdo se svatebním darem hlavu láme, potom vězte, že my
          dva už v domácnosti všechno máme. Potěší nás ale příspěvek v jakékoliv
          výši, který nám náš rozpočet do budoucna zvýší.<br /><br />

          Rádi bychom, abyste věděli, že barva naší svatby je
          <strong>zelená</strong>, konkrétně v odstínech eukalyptu. Pokud se
          chcete k tomuto barevnému ladění připojit, budeme moc rádi! Není to
          však žádná povinnost, hlavně si přejeme, abyste si náš svatební den
          užili.<br /><br />
          Potvrďte prosím vaši účast, počet osob a zájem o přespání na níže
          uvedený mail, nebo můžete zanechat vzkaz.<br /><br />

          Moc vám děkujeme a už se nemůžeme dočkat, až s vámi oslavíme náš velký
          den!<br /><span class="heart-emoji">💚</span>
        </p>

        <button class="button contact-us-button" (click)="dialogOpen.set(true)">
          Zanechat vzkaz
        </button>

        <p class="contact-us">
          — nebo —<br />
          <a href="mailto:evillinhe@gmail.com?subject=Svatba"
            >evillinhe&#64;gmail.com</a
          >
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
        p,
        ul,
        a {
          color: #064e3b;
        }
      }

      .contact-us,
      .about-wedding {
        color: #064e3b;
        text-align: center;
        line-height: 1.5;
        a {
          color: #064e3b;
        }
      }

      .contact-us {
        margin-top: 0.5rem;
      }

      h3 {
        font-weight: 400;
        color: #064e3b;
      }

      .heart-emoji {
        font-size: 1.5rem;
      }

      .about-wedding {
        max-width: 45rem;
        margin-bottom: 3rem;
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
