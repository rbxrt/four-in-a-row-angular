import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, selectCurrentPlayer } from '@store/store.selectors';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, RouterLink, RouterOutlet, AsyncPipe],
})
export class AppComponent {
  private store = inject<Store<AppState>>(Store);

  activePlayer$: Observable<string>;
  title = 'four-in-a-row';

  constructor() {
    this.activePlayer$ = this.store.select(selectCurrentPlayer).pipe(map((p) => (p === 0 ? "RED's" : "YELLOW's")));
  }
}
