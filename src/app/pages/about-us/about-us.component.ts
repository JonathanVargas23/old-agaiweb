import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  @ViewChild('carousel') carousel: OwlCarousel;
  prev: HTMLElement;
  next: HTMLElement;
  slideOptions = {
    dots: false,
    touchDrag: false,
    pullDrag: false,
    loop: true,
    margin: 0,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1.1,
      },
      1: {
        items: 1.1,
      },
    }
  };

  constructor(@Inject(PLATFORM_ID) private platformID: any) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformID)) {
      this.prev = document.getElementById('previuos');
      this.prev.style.display = 'none';    
    }
  }

  learnMore(url: string) {
    if (isPlatformBrowser(this.platformID)) {
      window.open(url, '_blank');
    }
  }
  nextSlide() {
    this.carousel.next();
    this.prev.style.display = 'block';
    setTimeout(() => {
      this.carousel.refresh();
    }, 500);
  }
  prevSlide() {
    this.carousel.previous();
    this.prev.style.display = 'none';
    setTimeout(() => {
      this.carousel.refresh();
    }, 500);
  }

}
