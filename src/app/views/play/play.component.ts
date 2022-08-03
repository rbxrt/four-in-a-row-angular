import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { firstValueFrom, map, Observable, Subscription } from 'rxjs';
import { GameoverComponent } from 'src/app/components/gameover/gameover.component';
import { reset } from 'src/app/services/activePlayer.action';
import { BoardService, ColProps, ColState } from 'src/app/services/board.service';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit, OnDestroy {

  board: ColProps[][];
  gameover: boolean = false;
  subscription: Subscription | undefined;

  constructor(public dialog: MatDialog, private boardService: BoardService, private store: Store<{ activePlayer: number }>) {
    this.board = boardService.board;
  }

  ngOnInit(): void {
    this.subscription = this.boardService.gameover.subscribe(r => {
      this.gameover = r;
      if (r) this.openDialog()
    });

  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  openDialog() {
    let dialogRef = this.dialog.open(GameoverComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onReset();
      }
      else {
        console.log("cancel");
      }
    });
  }

  renderState(s: ColState | undefined) {
    switch (s) {
      case ColState.YELLOW:
        return "yellow"
      case ColState.RED:
        return "red"
      case ColState.EMPTY:
      default:
        return "";
    }
  }

  async addToken(i: number) {

    if (this.gameover) {
      return;
    }

    let currentColor = await firstValueFrom(this.store.select('activePlayer'))

    this.boardService.addToBoard(i, currentColor % 2 === 0 ? ColState.RED : ColState.YELLOW);

  }

  onReset() {
    this.store.dispatch(reset());
    this.board = this.boardService.initialize()
  }

}
