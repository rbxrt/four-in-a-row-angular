import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum ColState {
  RED,
  YELLOW,
  EMPTY
}

export interface ColProps {
  state: ColState;
}

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  public board: ColProps[][];
  public gameover: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.board = this.createBoard();
  }

  private createBoard(): ColProps[][] {

    const _board = new Array<ColProps[]>(7);

    for (let colIndex = 0; colIndex < 7; colIndex++) {
      const _col = new Array<ColProps>(6).fill({ state: ColState.EMPTY });
      _board[colIndex] = _col;
    }

    return _board;

  }

  public initialize() {
    this.board = this.createBoard();
    this.gameover.next(false);

    return this.board;
  }

  public addToBoard(col: number, color: ColState.RED | ColState.YELLOW) {

    const _col = this.board[col];
    const _lastEmptyPos = _col.findIndex(x => x.state === ColState.EMPTY);

    if (_lastEmptyPos > -1) {
      this.board[col][_lastEmptyPos] = { state: color };
      this.checkForWinner();
    }

  }

  private checkForWinner() {

    let _winnerFound = false;


    this.board.forEach(col => {
      let _winnerCount = 1;

      col.filter(e => e.state !== ColState.EMPTY).forEach((e, i, arr) => {

        if (e.state === arr[i - 1]?.state) {
          _winnerCount++;
        } else {
          _winnerCount = 1;
        }
      });

      if (_winnerCount === 4) {
        _winnerFound = true;
      }

    });

    if (_winnerFound) {
      this.gameover.next(true);
    }

  }
}
