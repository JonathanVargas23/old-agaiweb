import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivationEnd,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import { AnalyticsService } from './services/analytics.service';
import { filter, map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { isPlatformBrowser } from '@angular/common';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isSupport: boolean = false;
  blog: boolean = false;
  viewBlog: boolean = false;
  image =
    'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/logos/--logo-main.svg';
  constructor(
    @Inject(PLATFORM_ID) private platformID: any,
    private _title: Title,
    private router: Router,
    private _analytics: AnalyticsService,
    private _firestore: AngularFirestore,
    private _ui: UiService
  ) {
    this.getTitle();
    this.sendEvents();
  }

  public queryDoc(path: string): AngularFirestoreDocument<any> {
    return this._firestore.doc(path);
  }

  ngOnInit(): void {
    // this.queryDoc(`/idioms/1/landing/es`).get().toPromise().then((x) => console.log(JSON.stringify(x.data())))
    // for (const lang of ['es', 'es-419', 'es-AR', 'es-CL', 'es-CO', 'es-CR', 'es-ES', 'es-HN', 'es-MX', 'es-PE', 'es-US', 'es-UY', 'es-VE']) {
    // for (const lang of ['en']) {
    //   this.queryDoc(`/idioms/1/landing/${lang}`).update({}).then((res) => console.log(res))
    // }
    const setLang = async () => {
      if (isPlatformBrowser(this.platformID)) {
        let langUser = await this._ui.getStorage('lang');
        let lang = langUser ? langUser : window.navigator.language.split('-')[0];
        this._ui.setState(lang == 'es' || lang == 'en' ? lang : 'es');
      }
    }
    setLang();
  }

  getTitle() {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      )
      .subscribe((data) => {
        this.setDocTitle(data['title']);
      });
  }

  public setDocTitle(title: string) {
    this._title.setTitle(title + ' | AgrodatAi');
  }

  sendEvents() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.isSupport = e.url.includes('support') ? true : false;
        this.blog = e.url.includes('blog') ? true : false;
        this.viewBlog = e.url.includes('viewBlog') ? true : false;
        this._analytics.screenView(e);
      });
  }
}
