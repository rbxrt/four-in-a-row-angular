import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectCurrentPlayer } from '@store/store.selectors';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  activePlayer$: Observable<string>;
  title = 'four-in-a-row';

  constructor(private store: Store<AppState>) {
    this.activePlayer$ = this.store.select(selectCurrentPlayer).pipe(map((p) => (p === 0 ? "RED's" : "YELLOW's")));
  }
}
