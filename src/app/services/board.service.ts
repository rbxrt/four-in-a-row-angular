import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { reset, switchPlayer } from './activePlayer.action';

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

  constructor(private store: Store) {
    this.board = this.createBoard();
  }

  private createBoard(): ColProps[][] {

    const _board = new Array<ColProps[]>(7);

    for (let colIndex = 0; colIndex < 7; colIndex++) {
      let _col = new Array<ColProps>(6).fill({ state: ColState.EMPTY });
      _board[colIndex] = _col;
    }

    return _board;

  }

  public initialize() {
    this.board = this.createBoard();
    this.gameover.next(false);
    this.store.dispatch(reset());

    return this.board;
  }

  public addToBoard(col: number, color: ColState.RED | ColState.YELLOW) {

    let _col = this.board[col];
    let _lastEmptyPos = _col.findIndex(x => x.state === ColState.EMPTY);

    if (_lastEmptyPos > -1) {
      this.board[col][_lastEmptyPos] = { state: color };
      let _gameIsOver = this.checkForWinner();

      if(_gameIsOver) {
        this.gameover.next(true);
      } else {
        this.store.dispatch(switchPlayer());
      }
    }

  }

  private checkForWinner(): boolean {

    let _winnerFound = this.checkHorizontal() || this.checkVertical() || this.checkDiagonal();

    return _winnerFound;

  }

  private checkVertical(): boolean {
    let _gameIsOver = false;
    this.board.forEach(col => {
      let _matchCount = 1;

      col.forEach((e, i, arr) => {

        if (e.state !== ColState.EMPTY && e.state === arr[i - 1]?.state) {
          _matchCount++;
        } else {
          _matchCount = 1;
        }
      });

      if (_matchCount === 4) {
        _gameIsOver = true;
      }

    });

    return _gameIsOver;
  }
  private checkHorizontal(): boolean {
    let _gameIsOver = false;

    for (let _rowIndex = 0; _rowIndex < this.board[0].length; _rowIndex++) {
      let _row = this.board.flatMap(col => col[_rowIndex]);
      let _matchCount = 1;

      _row.forEach((e, i, arr) => {

        if (e.state !== ColState.EMPTY && e.state === arr[i - 1]?.state) {
          _matchCount++;
        } else {
          _matchCount = 1;
        }
      });

      if (_matchCount === 4) {
        _gameIsOver = true;
      }

    }

    return _gameIsOver;
  }

  private checkDiagonal(): boolean {
    let _gameIsOver = false;

    this.board.forEach((col, i, board) => {

      col.filter(e => e.state !== ColState.EMPTY).forEach((e, j, currentCol) => {
        
        //from south east to north west
        let _localIndex1 = i + 1;
        let _localIndex2 = j + 1;
        let _matchCount = 1;

        while (_localIndex1 <= board.length || _localIndex2 <= currentCol.length) {
          if (e.state === board[_localIndex1]?.[_localIndex2]?.state) {
            _matchCount++;
          }
          _localIndex1++;
          _localIndex2++;
        }

        if (_matchCount === 4) {
          _gameIsOver = true;
        }

        //from north east to south west
        _localIndex1 = i + 1;
        _localIndex2 = j - 1;
        _matchCount = 1;

        while (!_gameIsOver && (_localIndex1 <= board.length || _localIndex2 >= 0)) {
          if (e.state === board[_localIndex1]?.[_localIndex2]?.state) {
            _matchCount++;
          }
          _localIndex1++;
          _localIndex2--;
        }

        if (_matchCount === 4) {
          _gameIsOver = true;
        }

      });


    });

    return _gameIsOver;
  }
}
