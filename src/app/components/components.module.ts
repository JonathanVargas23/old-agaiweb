import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DonTulioComponent } from './don-tulio/don-tulio.component';
import { TranslateModule } from '@ngx-translate/core';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
@NgModule({
  declarations: [
    CardComponent,
    HeaderComponent,
    ContactComponent,
    FooterComponent,
    DonTulioComponent,
  ],
  exports: [
    CardComponent,
    HeaderComponent,
    ContactComponent,
    FooterComponent,
    DonTulioComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ReactiveFormsModule
  ],
})
export class ComponentsModule {}
