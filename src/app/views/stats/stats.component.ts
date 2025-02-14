import { Component, inject } from '@angular/core';
import { StatsService } from '@services/stats.service';
import { GameStatisticsProps } from 'types';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  standalone: true,
})
export class StatsComponent {
  private statistics = inject(StatsService);

  _statsFromStorage: GameStatisticsProps;

  constructor() {
    this._statsFromStorage = this.statistics.getStatistics();
  }
}
