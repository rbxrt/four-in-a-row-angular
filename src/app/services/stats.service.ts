import { Injectable, inject } from '@angular/core';
import { GameStatisticsProps as GameStatisticsProps } from 'types';

import { LocalStorageService } from './local-storage.service';

const STATISTICS_KEY = 'game-statistics';

const INITIAL_VALUE: GameStatisticsProps = {
  redIsWinner: 0,
  yellowIsWinner: 0,
};

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private storage = inject(LocalStorageService);


  public increaseRedCounter() {
    const currentValue = this.getStatistics();
    const updatedValue: GameStatisticsProps = {
      ...currentValue,
      redIsWinner: (currentValue.redIsWinner += 1),
    };

    this.storage.saveData(STATISTICS_KEY, JSON.stringify(updatedValue));
  }

  public increaseYellowCounter() {
    const currentValue = this.getStatistics();
    const updatedValue: GameStatisticsProps = {
      ...currentValue,
      yellowIsWinner: (currentValue.yellowIsWinner += 1),
    };

    this.storage.saveData(STATISTICS_KEY, JSON.stringify(updatedValue));
  }

  public getStatistics() {
    const _statistics = this.storage.getData(STATISTICS_KEY);

    return _statistics != null ? (JSON.parse(_statistics) as GameStatisticsProps) : INITIAL_VALUE;
  }

  public removeStatistics() {
    this.storage.removeData(STATISTICS_KEY);
  }
}
