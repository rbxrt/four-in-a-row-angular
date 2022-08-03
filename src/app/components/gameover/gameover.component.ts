import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppState, selectPlayer, selectTie } from 'src/app/store/store';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss']
})
export class GameoverComponent {

  winner$: Observable<string>;
  tie$: Observable<boolean>;

  constructor(public dialogRef: MatDialogRef<GameoverComponent>, private store: Store<AppState>) {
    this.tie$ = store.select(selectTie)
    this.winner$ = store.select(selectPlayer).pipe(map(p => p === 0 ? "RED" : "YELLOW"));
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

}
