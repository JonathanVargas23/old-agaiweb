import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ContactForm, SubscribeForm } from '../interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from "@capacitor/storage";
export type ITypeLang = 'es' | 'en' | null;
@Injectable({
  providedIn: 'root'
})
export class UiService {

  private languageObs: BehaviorSubject<ITypeLang> = new BehaviorSubject<ITypeLang>(null);
  public dataGeneral = null;

  lang: ITypeLang = null;

  constructor(
    private _http: HttpClient,
    private _translate: TranslateService,
  ) { }

  async setStorage(key: string, value: any) {
    await Storage.set({ key, value });
  };

  async getStorage(key: string) {
    const { value } = await Storage.get({ key });
    return value;
  };

  getState() {
    return this.languageObs.asObservable();
  }

  setState(state: ITypeLang) {
    this.lang = state;
    this.setStorage('lang', state);
    this._translate.use(state);
    this.languageObs.next(state);
  }

  sendMessageContact(data: ContactForm) {
    let headers = new HttpHeaders();
    headers = headers.set( 'Authorization', environment.contactForm.tokenPage );
    return this._http.post( environment.contactForm.UrlService + 'admin/send_email/', data, { headers } );
  }

  subscribeForm(data: SubscribeForm) {
    let headers = new HttpHeaders();
    headers = headers.set( 'Authorization', environment.subscribeForm.tokenPage );
    return this._http.post( environment.subscribeForm.UrlService , data, { headers } );
  }
  
  getNews(url: string) {
    return this._http.post(url, {});
  }
}