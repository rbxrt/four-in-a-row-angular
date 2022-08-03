import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activePlayer$: Observable<string>;
  title = 'four-in-a-row';

  constructor(private store: Store<{ activePlayer: number }>) {
    this.activePlayer$ = store.select('activePlayer').pipe(map(p => p % 2 === 0 ? "RED's" : "YELLOW's"))

  }
}
