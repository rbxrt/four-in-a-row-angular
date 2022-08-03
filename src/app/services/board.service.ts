import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom, map } from 'rxjs';
import { AppState, selectPlayer } from '../store/store';
import { resetGame, setGameover, switchPlayer } from './../store/gameState.action';

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

  constructor(private store: Store<AppState>) {
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
    this.store.dispatch(resetGame());

    return this.board;
  }

  public async addToBoard(col: number) {

    let _col = this.board[col];
    let _lastEmptyPos = _col.findIndex(x => x.state === ColState.EMPTY);
    let _currentColor = await firstValueFrom(this.store.select(selectPlayer).pipe(map(s => s === 0 ? ColState.RED : ColState.YELLOW)));

    if (_lastEmptyPos > -1) {
      this.board[col][_lastEmptyPos] = { state: _currentColor };
      let _gameHasWinner = this.checkForWinner();
      let _gameHasDraw = this.checkForTie();
      
      if(_gameHasWinner || _gameHasDraw) {
        
        this.store.dispatch(setGameover({
          gameover: _gameHasWinner || _gameHasDraw, 
          tie: _gameHasDraw
        }));

      } else {
        this.store.dispatch(switchPlayer());
      }
    }

  }

  private checkForWinner(): boolean {
    let _winnerFound = this.checkHorizontal() || this.checkVertical() || this.checkDiagonal();
    return _winnerFound;
  }

  private checkForTie(): boolean {
    let _remainingEmpty = this.board.flatMap(c => c.filter(e => e.state === ColState.EMPTY)) || [];
    return _remainingEmpty.length === 0;
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

        if (_matchCount === 4) {
          console.info("4 gewinnt vertikal!")
          _gameIsOver = true;
        }
      });

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

        if (_matchCount === 4) {
          console.info("4 gewinnt horizontal!")
          _gameIsOver = true;
        }
      });
    }

    return _gameIsOver;
  }

  private checkDiagonal(): boolean {
    let _gameIsOver = false;

    this.board.forEach((col, i, board) => {

      col.forEach((e, j, currentCol) => {
        
        //from south east to north west
        let _localIndex1 = i + 1;
        let _localIndex2 = j + 1;
        let _matchCount = 1;

        while (_localIndex1 <= board.length || _localIndex2 <= currentCol.length) {
          if (e.state !== ColState.EMPTY && e.state === board[_localIndex1]?.[_localIndex2]?.state) {
            _matchCount++;
          } else {
            _matchCount = 1;
          }

          if (_matchCount === 4) {
            console.info("4 gewinnt diagonal (se->nw)!")
            _gameIsOver = true;
            break;
          }
          _localIndex1++;
          _localIndex2++;
        }

        //from north east to south west
        _localIndex1 = i + 1;
        _localIndex2 = j - 1;
        _matchCount = 1;

        while (!_gameIsOver && (_localIndex1 <= board.length || _localIndex2 >= 0)) {
          if (e.state !== ColState.EMPTY && e.state === board[_localIndex1]?.[_localIndex2]?.state) {
            _matchCount++;
          } else {
            _matchCount = 1;
          }

          if (_matchCount === 4) {
            console.info("4 gewinnt diagonal (ne->sw)!")
            _gameIsOver = true;
            break;
          }
          _localIndex1++;
          _localIndex2--;
        }

      });

    });

    return _gameIsOver;
  }
}
