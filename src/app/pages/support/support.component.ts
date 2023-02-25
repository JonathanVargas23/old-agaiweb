import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformID: any,
    private _analytics: AnalyticsService,
  ) { }

  ngOnInit(): void {
  }

  goSupport() {
    if(isPlatformBrowser(this.platformID)) {
      window.open(environment.SUPPORT.URL, '_blank');
    }
  }
}
