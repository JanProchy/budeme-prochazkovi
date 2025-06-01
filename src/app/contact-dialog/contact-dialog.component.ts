import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-contact-dialog',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div
      class="dialog-backdrop"
      *ngIf="opened()"
      (click)="close.emit()"
    ></div>
    <div class="dialog" *ngIf="opened()">
      <div class="dialog-content">
        <ng-container *ngIf="!sent(); else thankYou">
          <form
            class="contact-form"
            (click)="$event.stopPropagation()"
            (submit)="onSubmit($event)"
          >
            <h2>Vzkaz pro nás</h2>

            <p>
              Pokud máte nějaké dotazy, neváhejte nám napsat. Budeme rádi, když
              nám napíšete, zda se zúčastníte svatby.
            </p>

            <div class="input">
              <label for="message"> Váš vzkaz:</label>
              <textarea
                id="message"
                name="message"
                required
                rows="6"
              ></textarea>
            </div>

            <div class="input">
              <label for="name"> Vaše jméno:</label>
              <input id="name" name="name" required maxlength="50" />
            </div>

            <div class="buttons">
              <button
                type="button"
                class="button secondary"
                (click)="close.emit()"
              >
                Zavřít
              </button>
              <button type="submit" class="button" [disabled]="loading()">
                @if(loading()) { Odesílání... } @else { Odeslat }
              </button>
            </div>
          </form>
        </ng-container>
        <ng-template #thankYou>
          <div class="thank-you">
            <h2>Děkujeme za vzkaz!</h2>
            <p>Vaše zpráva byla úspěšně odeslána.</p>
            <button class="button" (click)="close.emit(); sent.set(false)">
              Zavřít
            </button>
          </div>
        </ng-template>
      </div>
    </div>`,
  styleUrls: ['./contact-dialog.component.scss'],
})
export class ContactDialogComponent {
  opened = input(false);

  close = output<void>();

  loading = signal(false);

  sent = signal(false);

  async onSubmit(event: Event) {
    event.preventDefault();
    this.loading.set(true);

    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    const response = await fetch('https://formspree.io/f/xdkgjnko', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
      },
    });

    this.loading.set(false);

    if (response.ok) {
      this.sent.set(true);
      form.reset();
    } else {
      alert('Odeslání se nezdařilo. Zkuste to prosím znovu.');
    }
  }
}
