import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { interval } from 'rxjs';
import { goWhatsapp } from 'src/app/common/utils/utils';

@Component({
  selector: 'app-don-tulio',
  templateUrl: './don-tulio.component.html',
  styleUrls: ['./don-tulio.component.scss']
})
export class DonTulioComponent implements OnInit {
  don_tulio: HTMLElement;
  cloud: HTMLElement;
  constructor(@Inject(PLATFORM_ID) private platformID: any) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformID)) {
      this.ctrlDonTulio();
    }
  }

  ctrlDonTulio() {
    this.don_tulio = document.getElementById('don-tulio');
    this.cloud = document.getElementById('cloud');
    setTimeout(() => {
      this.cloud.style.display = 'none';
      this.cloud.classList.remove('animate__tada');
      this.don_tulio.classList.remove('animate__tada');
    }, 7000);
    
    this.initInterval();
    if (this.don_tulio) {
      this.don_tulio.addEventListener('mouseover', () => {
        this.cloud.classList.remove('animate__tada');
        this.cloud.style.display = 'block'
      });
      this.don_tulio.addEventListener('mouseleave', () => this.cloud.style.display = 'none');
    }
  }

  initInterval() {
    const i = interval(1000).subscribe((n) => {
      if (n == 12) {
        this.don_tulio.classList.add('animate__tada');
        this.cloud.style.display = 'block';
        setTimeout(() => {
          this.cloud.style.display = 'none';
          this.don_tulio.classList.remove('animate__tada');
        }, 7000);
        i?.unsubscribe();
        this.initInterval();
      }
    });
  }

  async goWhatsapp() {
    goWhatsapp(this.platformID);
  }

}
