import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'play', pathMatch: 'full' },
  { path: 'play', loadComponent: () => import('./views/play/play.component').then(m => m.PlayComponent) },
  { path: 'stats', loadComponent: () => import('./views/stats/stats.component').then(m => m.StatsComponent) },
  { path: 'settings', loadComponent: () => import('./views/settings/settings.component').then(m => m.SettingsComponent) },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
