import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState, selectWinner } from '@store/store.selectors';
import { Observable } from 'rxjs';
import { ResultEnum } from 'types';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss'],
})
export class GameoverComponent {
  RESULT = ResultEnum;
  winner$: Observable<ResultEnum>;

  constructor(public dialogRef: MatDialogRef<GameoverComponent>, private store: Store<AppState>) {
    this.winner$ = store.select(selectWinner);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
