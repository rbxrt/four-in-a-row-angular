import { Component } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';
import { GameStatistics } from 'src/app/types/game';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {

  _statsFromStorage: GameStatistics;

  constructor(private statistics: StatsService) { 
    this._statsFromStorage = this.statistics.getStatistics();
  }
}
