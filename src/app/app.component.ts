import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AppState, selectPlayer } from './store/store.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activePlayer$: Observable<string>;
  title = 'four-in-a-row';

  constructor(private store: Store<AppState>) {
    this.activePlayer$ = store.select(selectPlayer).pipe(map(p => p === 0 ? "RED's" : "YELLOW's"))

  }
}
