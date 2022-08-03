import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { firstValueFrom, Subscription } from 'rxjs';
import { GameoverComponent } from 'src/app/components/gameover/gameover.component';
import { BoardService, ColProps, ColState } from 'src/app/services/board.service';
import { resetGame } from 'src/app/store/gameState.action';
import { AppState, selectGameover } from 'src/app/store/store';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit, OnDestroy {

  board: ColProps[][];
  subscription: Subscription | undefined;

  constructor(public dialog: MatDialog, private boardService: BoardService, private store: Store<AppState>) {
    this.board = boardService.board;
  }

  ngOnInit(): void {
    this.subscription = this.store.select(selectGameover).subscribe(gameover => {

      if (gameover) {
        this.openDialog();
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
