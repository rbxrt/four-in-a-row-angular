import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardService, ColProps, ColState } from 'src/app/services/board.service';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  board: ColProps[][];
  turn: number = 0;
  gameover: boolean = false;

  constructor(private boardService: BoardService) {
    this.board = boardService.board;
  }

  ngOnInit(): void {
    this.boardService.gameover.subscribe(r => this.gameover = r);
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

    if(this.gameover) {
      return;
    }

    this.boardService.addToBoard(i, this.turn % 2 === 0 ? ColState.RED : ColState.YELLOW);
    
    this.turn++;

  }

  onReset() {
    this.board = this.boardService.initialize()
  }

}
