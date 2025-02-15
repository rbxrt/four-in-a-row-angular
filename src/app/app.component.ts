import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { map } from 'rxjs';
import { AppState, selectCurrentPlayer, selectIsGameover } from '@store/store.selectors';
import { resetGame } from '@store/gameState.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ButtonModule, MenubarModule, RouterLink, RouterOutlet, AsyncPipe],
})
export class AppComponent {
  private store = inject<Store<AppState>>(Store);

  activePlayer$ = this.store.select(selectCurrentPlayer).pipe(map((p) => (p === 0 ? "RED's" : "YELLOW's")));
  isGameOver$ = this.store.select(selectIsGameover);
  title = 'four-in-a-row';
  menuItems = [
    { link: '/play', name: 'Play', icon: 'pi-play' },
    { link: '/stats', name: 'History', icon: 'pi-chart-bar' },
    { link: '/settings', name: 'Settings', icon: 'pi-cog' },
  ];

  restart() {
    this.store.dispatch(resetGame());
  }

  toggleDarkMode() {
    const element = document.querySelector('html')!;
    element.classList.toggle('dark');
  }
}
