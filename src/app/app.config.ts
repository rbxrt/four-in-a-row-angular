import { ApplicationConfig } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { gameSettingsReducer } from "@store/gameSettings.reducer";
import { gameStateReducer } from "@store/gameState.reducer";
import { StoreEffects } from "@store/store.effects";
import { AppState } from "@store/store.selectors";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore<AppState>({ gameState: gameStateReducer, settings: gameSettingsReducer }),
    provideEffects([StoreEffects]),
    provideAnimations()
  ]
};