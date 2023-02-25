import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';
import { SubscribeForm } from 'src/app/interfaces/interfaces';
import { UiService } from '../../services/ui.service';
import { AnalyticsService } from '../../services/analytics.service';
import { Device } from '@capacitor/device';
import { Router } from '@angular/router';
import { SLIDE_OPTIONS } from './blog-constants';
import { DATA_BLOG, DATA_BLOG_SELECTED } from '../../dataBlogs';
import { isPlatformBrowser } from '@angular/common';
import { debounceTime } from 'rxjs';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { downloadAppLinks } from 'src/app/common/utils/utils';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  public slideOptions = SLIDE_OPTIONS;
  public dataShow = DATA_BLOG;
  public dataDefault = DATA_BLOG;
  public dataBlogSelected = DATA_BLOG_SELECTED;
  public pages: number = 1;
  public mySearch = new FormControl('');
  public disabledButton: boolean = false;
  public loading: boolean = false;
  public textButton: string = 'blog.seccions.three.textTwo';
  public message: string = '';
  public showMessage: boolean = false;
  public check: boolean = false;
  public mySearchValue = false;
  subscribeForm = this.fb.group({
    email: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[^@]+@[^@]+\.[a-zA-Z]{2,}$')
    ])],
  });
  constructor(
    @Inject(PLATFORM_ID) private platformID: any,
    private fb: FormBuilder,
    public _ui: UiService,
    private _router: Router,
    private _analytics: AnalyticsService,
  ) { }

  ngOnInit(): void {
    this.dataShow.map(item =>
      item.map(subItem => {
        if (subItem.type === 'smallText') {
          subItem.content = subItem.content.substr(0, 210) + "..."
        };
      }
      )
    );
    this.mySearch.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => this.handleSearch(value))
  }

  handleSearch(search: string) {
    const arrayFiler = [];
    let arrayData = Array.from(this.dataDefault);
    if (search.length > 0) {
      this.mySearchValue = true;
      arrayData.filter(item => {
        const textToCompare = item.map((subItem: any) => {
          if (subItem.type === 'title' && subItem.content.toLowerCase().includes(search.toLowerCase())) {
            arrayFiler.push(item)
          }
        });
        this.dataShow = arrayFiler
      })
    } else {
      this.dataShow = this.dataDefault;
      this.mySearchValue = false;
    };
  };

  scrollToTop() {
    if (isPlatformBrowser(this.platformID)) {
      document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  downloadApp() {
    downloadAppLinks(this.platformID);
  };

  goTo(id: number) {
    // console.log("ID URL", id);
    this._router.navigate(['viewBlog/', id]);
  };

  goToContact() {
    this._router.navigateByUrl('home?contact=true');
  }

  registerEvent(event: string) {
    this._analytics.event('Click ' + event, event, event);
  };

  sendForm() {
    this.showMessage = true;
    this.message = 'blog.seccions.three.errorEmail';
    this.showConfirm();
    if (this.subscribeForm.valid) {
      this.showMessage = false;
      this.loading = true;
      this.disabledButton = true;
      let { email } = this.subscribeForm.value;
      this._ui.subscribeForm({ email }).subscribe({
        next: resp => {
          this.subscribeForm.reset();
          this.message = 'blog.seccions.three.sucessEmail';
          this.check = true;
          this.disabledButton = false;
          this.loading = false;
          this.showConfirm();
        },
        error: err => {
          this.subscribeForm.reset();
          this.message = 'blog.seccions.three.existEmail';
          this.check = false;
          this.disabledButton = false;
          this.loading = false;
          this.showConfirm();
        }
      })
    };
  };

  showConfirm() {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.check = false;
    }, 10000);
  };
};
