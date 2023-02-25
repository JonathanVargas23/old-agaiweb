import { Component, Input, OnInit } from '@angular/core';
import { News } from 'src/app/interfaces/interfaces';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() news: News[] = [];
  constructor(private _analytics: AnalyticsService) { }

  ngOnInit(): void {
  }

  registerEvent() {
    this._analytics.event('Click Leer Noticia', 'Leer Noticia', 'Leer Noticia');
  }

}
