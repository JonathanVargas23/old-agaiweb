import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SKILLS } from './constants';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss'],
})
export class SolutionsComponent implements OnInit {
  skills = SKILLS;
  constructor(@Inject(PLATFORM_ID) private platformID: any) {}
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformID)) {
      setTimeout(() => {
        this.playVideos();
      }, 2000);
    }
  }

  playVideos() {
    let videos = document.querySelectorAll('video');
    videos.forEach((video) => {
      video.muted = true;
      video.play();
      video.loop = true;
    });
  }
}
