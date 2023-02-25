import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ITypeLang, UiService } from 'src/app/services/ui.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() image = 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/logos/--logo-main.svg';
  @Input() menu = 'color: green !important; border: 1px solid green;';
  isSolutions: boolean = false;
  isHome: boolean = true;
  isSupport: boolean = true;
  header: HTMLElement;
  constructor(
    @Inject(PLATFORM_ID) private platformID: any,
    private router: Router,
    private _analytics: AnalyticsService,
    public _ui: UiService,
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformID)) {
      this.header = document.getElementById('header');
      window.onscroll = () => {
        this.scroll();
      }
      this.router.events.subscribe((e: RouterEvent) => {
        if (e instanceof NavigationEnd) {
          const url = e.url;
          const tags = document.querySelectorAll('a');
          if (url.includes('solutions') || url.includes('home') || url.includes('support')) {
            if (url.includes('solutions')) this.isSolutions = true;
            if (url.includes('home') || url.includes('support')) this.isHome = true;
            this.image = 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/logos/--logo-main.svg';
            tags.forEach(a => {
              a.style.color = 'rgb(0, 154, 116) !important;'
            });
          } else if (url.includes('about-us') || url.includes('news')) {
            this.image = 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/logo-blanco-agrodatai.png';
            this.isSolutions = false;
            this.isHome = false;
            tags.forEach(a => {
              a.style.color = '#ffffff !important'
            });
          }
        }
      })
    }
  }

  scroll() {
    if(isPlatformBrowser(this.platformID)) {
      if (window.pageYOffset == 0) {
        this.header.classList.remove('sticky-solutions')
        this.header.classList.remove('sticky')
      } else {
        if (!this.isSolutions && !this.isHome) {
          this.header.classList.add('sticky');
        } else {
          this.header.classList.add('sticky-solutions');
        }
      }
    }
  }

  menuOpen() {
    if(isPlatformBrowser(this.platformID)) {
      let x = document.getElementById("myLinks");
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
    }
  }

  go(url: string) {
    this.router.navigate([url]);
  }

  changeLang(lang : ITypeLang){
    if(isPlatformBrowser(this.platformID)){
      this._ui.lang !== lang && this._ui.setState(lang);
    }
  }

  registerEvent() {
    this._analytics.event('Click Botón Entrar', 'Click Botón Entrar', 'Click Botón Entrar');
  }

}
