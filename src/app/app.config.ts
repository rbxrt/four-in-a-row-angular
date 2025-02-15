import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import Aura from '@primeng/themes/aura';
import { gameSettingsReducer } from '@store/gameSettings.reducer';
import { gameStateReducer } from '@store/gameState.reducer';
import { StoreEffects } from '@store/store.effects';
import { AppState } from '@store/store.selectors';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore<AppState>({ gameState: gameStateReducer, settings: gameSettingsReducer }),
    provideEffects([StoreEffects]),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities',
          },
        },
      },
    }),
  ],
};
