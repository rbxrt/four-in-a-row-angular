import { Injectable, inject } from '@angular/core';
import { GameSettingsProps } from 'types';

import { LocalStorageService } from './local-storage.service';

const SETTINGS_KEY = 'game-settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private storage = inject(LocalStorageService);


  public getDimensions() {
    const _statistics = this.storage.getData(SETTINGS_KEY);

    return _statistics != null ? (JSON.parse(_statistics) as GameSettingsProps) : null;
  }

  public saveDimensions(s: GameSettingsProps) {
    this.storage.saveData(SETTINGS_KEY, JSON.stringify(s));
  }
}
