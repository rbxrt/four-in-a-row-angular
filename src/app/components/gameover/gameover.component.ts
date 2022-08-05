import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectWinner  } from 'src/app/store/store.selectors';
import { ResultEnum } from 'src/app/types/game';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss']
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
