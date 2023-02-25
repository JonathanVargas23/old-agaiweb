import { isPlatformBrowser } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Device } from '@capacitor/device';
import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class FirebaseTransLoader implements TranslateLoader {
    constructor(private db: AngularFirestore) { }
    public getTranslation(lang: string, prefix: string = environment.prefix_lang): any {
        return this.db.doc(`${prefix}${lang}`).valueChanges() as Observable<any>;
    }
}

export class MyMissingTranslationHandler implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        const path = params.key.split('.');
        const langFile = require(`src/assets/lang/${'en'}.json`);
        let result: any;
        path.forEach((key) =>  result = (result || langFile)[key]);
        return result;
    }
}

export async function downloadAppLinks(platformID: any) {
    if(isPlatformBrowser(platformID)) {
      const info = await Device.getInfo();
      if (info.operatingSystem == 'ios' || info.operatingSystem == 'mac') {
       window.open(environment.STORE_LINKS.IOS)
      } else if (info.operatingSystem == 'android' || info.operatingSystem == 'windows') {
        window.open(environment.STORE_LINKS.ANDROID);
      }
    }
}

export async function goWhatsapp(platformID: any) {
    if (isPlatformBrowser(platformID)) {
      const info = await Device.getInfo();
      if (info.operatingSystem == 'android' || info.operatingSystem == 'ios') {
        window.open(environment.WHATSAPP.MOBILE, '_blank');
      } else  {
        window.open(environment.WHATSAPP.WEB, '_blank');
      }
    }
  }