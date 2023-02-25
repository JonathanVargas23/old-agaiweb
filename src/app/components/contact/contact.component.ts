import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UiService } from '../../services/ui.service';
import { environment } from '../../../environments/environment';
import { AnalyticsService } from '../../services/analytics.service';
import { ContactForm } from '../../interfaces/interfaces';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm = this.fb.group({
    name: ['', Validators.required],
    message: ['', Validators.required],
    email: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])],
    recaptcha: ['', Validators.required],
  });

  disabledButton: boolean =false;
  loading: boolean =false;
  textButton: string = 'contact.form.button';
  message: string = '';
  check: boolean =false;
  showMessage: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformID: any,
    private fb: FormBuilder, 
    private _ui: UiService, 
    private _analytics: AnalyticsService) { }

  ngOnInit(): void {
  }

  sendForm() {
    this.disabledButton = true;
    this.loading = true;
    this.textButton = 'contact.form.button-sending';
    let data = this.contactForm.value;
    let contact: ContactForm = {
      "to": environment.contactForm.emailContact,
      "subject": `${data.name} quiere conocer más acerca de la plataforma AgrodatAi`,
      "answer_to": data.email,
      "content": `Mensaje: ${ data.message } | Datos de contacto Correo: ${ data.email }`
    };
    this._ui.sendMessageContact(contact).subscribe({ 
      next: resp => {
        this.contactForm.reset();
        this.message = 'contact.form.message1';
        this.check = true;
        this.showConfirm();
        this._analytics.event('Click Formulario Contacto', 'Formulario Contacto', 'Formulario Contacto');
        this.disabledButton = false;
        this.loading = false;
        this.textButton = 'contact.form.button';
      },
      error: err => {
        console.log('Error', err);
        this.contactForm.reset();
        this.message = 'contact.form.message2';
        this.check = false;
        this.showConfirm();
        this.disabledButton = false;
        this.loading = false;
        this.textButton = 'contact.form.button';
      }
    })
  }

  showConfirm() {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }

  register(url: string) {
    if (isPlatformBrowser(this.platformID)) {
      window.open(url, '_blank');
      this._analytics.event('Click Botón de Registro', 'Botón de Registrarse', 'Botón de Registrarse');
    }
  }
  
  go(url: string, enter?: boolean) {
    if (isPlatformBrowser(this.platformID)) {
      window.open(url, '_blank');
      if (enter) {
        this._analytics.event('Click Botón Entrar', 'Click Botón Entrar', 'Click Botón Entrar');
      }
    }
  }
}
