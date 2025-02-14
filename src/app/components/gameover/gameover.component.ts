import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState, selectWinner } from '@store/store.selectors';
import { Observable } from 'rxjs';
import { ResultEnum } from 'types';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss'],
  imports: [MatDialogModule, MatButtonModule, AsyncPipe],
})
export class GameoverComponent {
  dialogRef = inject<MatDialogRef<GameoverComponent>>(MatDialogRef);
  private store = inject<Store<AppState>>(Store);

  RESULT = ResultEnum;
  winner$: Observable<ResultEnum>;

  constructor() {
    const store = this.store;

    this.winner$ = store.select(selectWinner);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
