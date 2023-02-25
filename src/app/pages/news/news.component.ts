import { Component, OnDestroy, OnInit } from '@angular/core';
import { News } from 'src/app/interfaces/interfaces';
import { UiService } from '../../services/ui.service';
import { ResponseNews } from '../../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
const BACK_URL = environment.BACK_URL;
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, OnDestroy {
  public news: News[] = [];
  currentLimit = 5;
  offset = 0;
  previousPage: string;
  nextPage: string = `${BACK_URL}?limit=${this.currentLimit}&offset=${this.offset}`;
  isLoad: boolean = false; 
  noData: boolean = false;
  showLoading: boolean = true;
  private subs: Subscription;
  
  constructor(
    private _ui: UiService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.subs = this._ui.getState().subscribe( lang => {
      // console.log('Lang: ', lang);
      if (this._ui.lang == 'es') {
        this.getNews();
      }
      this._ui.lang == 'en' && this._router.navigate(['/home']);
    });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

  getNews() {
    this.isLoad = !this.isLoad; 
    this._ui.getNews(this.nextPage).subscribe({
      next: (res: ResponseNews) => {
        this.news.push(...res.rows);
        this.nextPage = res.next_page;
        this.previousPage = res.previous_page;
        this.isLoad = !this.isLoad;
        this.showLoading = false;
        if (res.rows.length == 0) {
          this.noData = true;
        }
      },
      error: err => {
        if (this.news.length == 0) this.noData = true;
        this.showLoading = false;
      }
    });
  }
}
