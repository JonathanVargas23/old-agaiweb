import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year = new Date().getFullYear();

  imgs = {
    facebook: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/landing/footer/Facebook.svg',
    whatsapp: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/landing/footer/WhatsApp.svg',
    linkedin: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/landing/footer/Linkedin.svg',
    instagram: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/landing/footer/Instagram.svg',
    servi: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/landing/footer/Servinformacion.svg',
    cebar: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/landing/footer/SFA%20Cebar.svg',
  }
  constructor(public _ui: UiService, @Inject(PLATFORM_ID) private platformID: any,) { }

  ngOnInit(): void {
  }

  go(url: string) {
    if (isPlatformBrowser(this.platformID)) {
      window.open(url, '_blank');
    }
  }

}
