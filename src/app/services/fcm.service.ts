import { inject, Injectable } from '@angular/core';
import { Messaging, getToken } from '@angular/fire/messaging';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FcmService {
  messaging = inject(Messaging);

  async requestPermissionAndGetToken(): Promise<string | undefined> {
    try {
      const token = await getToken(this.messaging, {
        vapidKey: environment.firebase.vapidKey,
      });
      console.log('FCM Token:', token);
      return token;
    } catch (err) {
      console.error('Permission denied or error:', err);
      return;
    }
  }
}
