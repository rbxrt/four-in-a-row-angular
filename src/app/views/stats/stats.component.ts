import { Component } from '@angular/core';
import { StatsService } from '@services/stats.service';
import { GameStatisticsProps } from 'types';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  _statsFromStorage: GameStatisticsProps;

  constructor(private statistics: StatsService) {
    this._statsFromStorage = this.statistics.getStatistics();
  }
}
