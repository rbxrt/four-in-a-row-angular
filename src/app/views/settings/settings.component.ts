import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '@services/settings.service';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  imports: [SliderModule, FormsModule],
})
export class SettingsComponent {
  private service = inject(SettingsService);

  widthValue: number;
  heightValue: number;
  counter = Array;

  constructor() {
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
