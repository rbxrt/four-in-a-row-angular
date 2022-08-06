import { Component } from '@angular/core';
import { SettingsService } from '@services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  widthValue: number;
  heightValue: number;
  counter = Array;

  constructor(private service: SettingsService) {
    const dimensions = this.service.getDimensions();
    this.heightValue = dimensions?.height ?? 6;
    this.widthValue = dimensions?.width ?? 7;
  }

  widthChanged(val: number) {
    this.service.saveDimensions({
      height: this.heightValue,
      width: val,
    });
  }

  heightChanged(val: number) {
    this.service.saveDimensions({
      height: val,
      width: this.widthValue,
    });
  }
}
