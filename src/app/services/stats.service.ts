import { Injectable } from '@angular/core';
import { GameStatistics } from '../types/game';
import { LocalStorageService } from './local-storage.service';

const STATISTICS_KEY = "game-statistics";

const INITIAL_VALUE: GameStatistics = {
  redIsWinner: 0,
  yellowIsWinner: 0
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private storage: LocalStorageService) { }

  public increaseRedCounter() {
    let { redIsWinner, ...currentValue } = this.getStatistics();
    let updatedValue: GameStatistics = {
      ...currentValue, 
      redIsWinner: redIsWinner+=1 
    };
    
    this.storage.saveData(STATISTICS_KEY, JSON.stringify(updatedValue));
  }

  public increaseYellowCounter() {
    let { yellowIsWinner, ...currentValue } = this.getStatistics();
    let updatedValue: GameStatistics = {
      ...currentValue, 
      yellowIsWinner: yellowIsWinner+=1 
    };

    this.storage.saveData(STATISTICS_KEY, JSON.stringify(updatedValue));
  }

  public getStatistics() {
    let _statistics = this.storage.getData(STATISTICS_KEY);

    return _statistics != null 
    ? JSON.parse(_statistics) as GameStatistics
    : INITIAL_VALUE;
  }

  public removeStatistics() {
    this.storage.removeData(STATISTICS_KEY);
  }

}
