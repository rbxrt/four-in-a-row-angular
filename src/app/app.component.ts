import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectCurrentPlayer } from '@store/store.selectors';
import { map, Observable } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
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
