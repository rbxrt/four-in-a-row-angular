import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameoverComponent } from '@components/gameover/gameover.component';
import { Store } from '@ngrx/store';
import { BoardService, FieldProps } from '@services/board.service';
import { resetGame } from '@store/gameState.action';
import { AppState, selectIsGameover } from '@store/store.selectors';
import { filter, firstValueFrom, Subscription, switchMap } from 'rxjs';
import { ColorEnum } from 'types';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit, OnDestroy {
  board: FieldProps[][] | undefined;
  subscription: Subscription | undefined;

  constructor(public dialog: MatDialog, private boardService: BoardService, private store: Store<AppState>) {
    this.board = this.boardService.initialize();
  }

  ngOnInit(): void {
    this.subscription = this.store
      .select(selectIsGameover)
      .pipe(
        filter((g) => g),
        switchMap(() => this.openDialog()),
      )
      .subscribe((res) => {
        if (res) {
          this.onReset();
        } else {
          console.log('cancel');
        }
      });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(GameoverComponent);
    return dialogRef.afterClosed();
  }

  renderState(s: ColorEnum | undefined) {
    switch (s) {
      case ColorEnum.YELLOW:
        return 'yellow';
      case ColorEnum.RED:
        return 'red';
      case ColorEnum.EMPTY:
      default:
        return '';
    }
  }

  async addToken(i: number) {
    if (await firstValueFrom(this.store.select(selectIsGameover))) {
      return;
    }
    this.boardService.addToBoard(i);
  }

  onReset() {
    this.store.dispatch(resetGame());
    this.board = this.boardService.initialize();
  }
}
