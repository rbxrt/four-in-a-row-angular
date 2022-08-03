import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GameoverComponent } from 'src/app/components/gameover/gameover.component';
import { BoardService, ColProps, ColState } from 'src/app/services/board.service';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit, OnDestroy {

  board: ColProps[][];
  turn: number = 0;
  gameover: boolean = false;
  subscription: Subscription | undefined;

  constructor(public dialog: MatDialog, private boardService: BoardService) {
    this.board = boardService.board;
  }

  ngOnInit(): void {
    this.subscription = this.boardService.gameover.subscribe(r => {
      this.gameover = r;
      if (r) this.openDialog()
    });

    this.initTurnCounter();
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  initTurnCounter() {
    this.turn = this.board.flatMap(c => c).filter(c => c.state != ColState.EMPTY)?.length || 0;

  }

  openDialog() {
    let dialogRef = this.dialog.open(GameoverComponent, { data: { 
      winner: this.turn % 2 === 0 ? "RED" : "YELLOW"}
    });

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

  addToken(i: number) {

    if (this.gameover) {
      return;
    }

    let _addResult = this.boardService.addToBoard(i, this.turn % 2 === 0 ? ColState.RED : ColState.YELLOW);

    if (_addResult) {
      this.turn++;
    }

  }

  onReset() {
    this.board = this.boardService.initialize()
  }

}
