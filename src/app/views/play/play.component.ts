import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  Store } from '@ngrx/store';
import { filter, firstValueFrom, Subscription, switchMap } from 'rxjs';
import { GameoverComponent } from 'src/app/components/gameover/gameover.component';
import { BoardService, FieldProps } from 'src/app/services/board.service';
import { resetGame } from 'src/app/store/gameState.action';
import { AppState, selectGameover } from 'src/app/store/store.selectors';
import { ColorEnum } from 'src/app/types/game';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit, OnDestroy {

  board: FieldProps[][];
  subscription: Subscription | undefined;

  constructor(public dialog: MatDialog, private boardService: BoardService, private store: Store<AppState>) {
    this.board = boardService.board;
  }

  ngOnInit(): void {
    this.subscription = this.store.select(selectGameover).pipe(       
      filter(g => g),
      switchMap(() => this.openDialog())).subscribe(res => {

        if (res) {
          this.onReset();
        }
        else {
          console.log("cancel");
        }
    });

  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openDialog() {
    let dialogRef = this.dialog.open(GameoverComponent);
    return dialogRef.afterClosed();
  }

  renderState(s: ColorEnum | undefined) {
    switch (s) {
      case ColorEnum.YELLOW:
        return "yellow"
      case ColorEnum.RED:
        return "red"
      case ColorEnum.EMPTY:
      default:
        return "";
    }
  }

  async addToken(i: number) {

    if (await firstValueFrom(this.store.select(selectGameover))) {
      return;
    }
      this.boardService.addToBoard(i);
    
  }

  onReset() {
    this.store.dispatch(resetGame());
    this.board = this.boardService.initialize()
  }

}
