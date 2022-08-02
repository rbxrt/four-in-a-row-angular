import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { SettingsComponent } from './settings/settings.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  { path: 'play', component: PlayComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
