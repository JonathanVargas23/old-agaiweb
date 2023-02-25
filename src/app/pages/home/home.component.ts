import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild, AfterViewInit } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';
import { Banners, News, ResponseNews, Slides } from 'src/app/interfaces/interfaces';
import { UiService } from '../../services/ui.service';
import { AnalyticsService } from '../../services/analytics.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ALLIES, SLIDES, SLIDE_OPTIONS, SLIDE_OPTIONS2 } from './home-constants';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { AngularFireRemoteConfig } from '@angular/fire/compat/remote-config';
import { downloadAppLinks } from 'src/app/common/utils/utils';

const BACK_URL = environment.BACK_URL;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('carousel') carousel: OwlCarousel;
  @ViewChild('banner') banner: OwlCarousel;
  currentLimit = 1;
  offset = 0;
  previousPage: string;
  nextPage: string = `${BACK_URL}?limit=${this.currentLimit}&offset=${this.offset}`;
  news: News[] = [];

  allies: string[] = ALLIES;

  banners: Banners[] = [];

  slideOptions = SLIDE_OPTIONS;
  slideOptions2 = SLIDE_OPTIONS2;

  slides: Slides[] = SLIDES;

  subs: Subscription;
  subsRoutes: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformID: any,
    public _ui: UiService, 
    private _analytics: AnalyticsService, 
    private activateRoute: ActivatedRoute,
    private _remoteConfig: AngularFireRemoteConfig,
  ) {}

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.init();
  }

  ngOnInit(): void {}

  async init() {
    await this.angularRemoteConfig();
    this.subs = this._ui.getState().subscribe( lang => {
      this.banners = this._ui.dataGeneral['home']['banners'].filter((b: Banners) =>  b.lang == lang);
      lang == 'es'? this.getNews(): this.news = [];
      this.banner?.refresh();
      this.banner?.reInit();
    });
    this.subsRoutes = this.activateRoute.queryParams.subscribe((params) => {
      if (params['contact']) {
        if (isPlatformBrowser(this.platformID)) {
          let contact = document.getElementById('contact');
          setTimeout(() => {
            contact.scrollIntoView({behavior: "smooth", inline: 'center', block:'center'});
          }, 1500);
        }
      }      
    });
  }

  async angularRemoteConfig() {    
    let { landing } = await this._remoteConfig.strings.toPromise();
    let value = JSON.parse(landing) || null;
    if (value) {
      this._ui.dataGeneral = value;
    }
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
    this.subsRoutes?.unsubscribe();
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformID)) {
      document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }

  getNews() {
    return new Promise((resolve, reject) => {
      this._ui.getNews(this.nextPage).subscribe(
        (res: ResponseNews) => {
          this.news.push(...res.rows)
          resolve(true);
        }
      );
    });    
  }

  redirectBanner(url: string) {
    if(isPlatformBrowser(this.platformID)) {
      if (url) {
        window.open(url, '_blank');
      }
    }
  }

  go(url: string, enter?: boolean) {
    if(isPlatformBrowser(this.platformID)) {
      window.open(url, '_blank');
      if (enter) {
        this._analytics.event('Click Botón Entrar', 'Click Botón Entrar', 'Click Botón Entrar');
      }
    }
  }

  async downloadApp() {
    downloadAppLinks(this.platformID);
  }

  nextSlide() {
    this.carousel.$owlChild.trigger('next.owl.carousel');
    setTimeout(() => {
      this.carousel.refresh();
    }, 500);
  }

  prevSlide() {
    this.carousel.$owlChild.trigger('prev.owl.carousel');
    setTimeout(() => {
      this.carousel.refresh();
    }, 500);
  }

  registerEvent(event: string) {
    this._analytics.event('Click ' + event, event, event);
  }
}
