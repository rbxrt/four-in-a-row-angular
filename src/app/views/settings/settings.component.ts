import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  
  widthValue: number = 7;
  heightValue: number = 6;
  constructor() {

   }

  ngOnInit(): void {
  }

}
