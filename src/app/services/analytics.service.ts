import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

declare var gtag: any;
@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(
    @Inject(PLATFORM_ID) private platformID: any,
    private _title: Title
  ) {}

  screenView(event: NavigationEnd) {
    if (isPlatformBrowser(this.platformID)) {
      gtag('event', 'page_view', {
        page_title: this._title.getTitle(),
        page_location: event.url,
        page_path: event.url,
        send_to: environment.firebaseConfig.measurementId,
      });
    }
  }
  event(eventName: string, event_label: string, event_category: string) {
    if (isPlatformBrowser(this.platformID)) {
      gtag('event', eventName, {
        event_category,
        event_label,
        send_to: environment.firebaseConfig.measurementId,
      });
    }
  }
}
