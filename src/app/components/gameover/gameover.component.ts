import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectWinner } from '@store/store.selectors';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ResultEnum } from 'types';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  imports: [ButtonModule, AsyncPipe],
})
export class GameoverComponent {
  private dialogRef = inject(DynamicDialogRef);
  private store = inject<Store<AppState>>(Store);

  RESULT = ResultEnum;
  winner$ = this.store.select(selectWinner);

  onOkClick() {
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
