import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OwlModule } from 'ngx-owl-carousel';

// Components
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { SolutionsComponent } from './pages/solutions/solutions.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NewsComponent } from './pages/news/news.component';
import { SupportComponent } from './pages/support/support.component';


import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';

// Angular Fire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireRemoteConfigModule, SETTINGS } from "@angular/fire/compat/remote-config";
import { AngularFireAnalyticsModule } from "@angular/fire/compat/analytics";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Translate
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { FirebaseTransLoader, MyMissingTranslationHandler } from './common/utils/utils';


// CAPTCHA
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';

import { environment } from '../environments/environment';
import { BlogComponent } from './pages/blog/blog.component';
import { ViewBlogComponent } from './pages/viewBlog/viewBlog.component';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    SolutionsComponent,
    NewsComponent,
    BlogComponent,
    ViewBlogComponent,
    SupportComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    AngularFireRemoteConfigModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    ComponentsModule,
    OwlModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    TranslateModule.forRoot({
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MyMissingTranslationHandler
      },
      loader: {
        provide: TranslateLoader,
        useFactory: (db: AngularFirestore) => {
          return new FirebaseTransLoader(db);
        },
        deps: [AngularFirestore]
      }
    })
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.RECAPTCHA.SITE_KEY,
      } as RecaptchaSettings,
    },
    {
      provide: SETTINGS,
      useValue: { minimumFetchIntervalMillis: 10 }
    },
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
