import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { resetGame, setGameover, switchPlayer } from '@store/gameState.action';
import { AppState, selectCurrentColor } from '@store/store.selectors';
import { firstValueFrom } from 'rxjs';
import { ColorEnum } from 'types';

import { SettingsService } from './settings.service';

export interface FieldProps {
  state: ColorEnum;
}

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private store = inject<Store<AppState>>(Store);
  private settings = inject(SettingsService);

  public board: FieldProps[][];

  constructor() {
    this.board = this.createBoard();
  }

  private createBoard(): FieldProps[][] {
    const { width, height } = this.settings.getDimensions() ?? { width: 7, height: 6 };

    const _board = new Array<FieldProps[]>(width);

    for (let colIndex = 0; colIndex < width; colIndex++) {
      const _col = new Array<FieldProps>(height).fill({ state: ColorEnum.EMPTY });
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
    const _col = this.board[col];
    const _lastEmptyPos = _col.findIndex((x) => x.state === ColorEnum.EMPTY);
    const _currentColor = await firstValueFrom(this.store.select(selectCurrentColor));

    if (_lastEmptyPos > -1) {
      this.board[col][_lastEmptyPos] = { state: _currentColor };
      const _gameHasWinner = this.checkForWinner();
      const _gameHasDraw = this.checkForDraw();

      if (_gameHasWinner || _gameHasDraw) {
        this.store.dispatch(
          setGameover({
            props: {
              gameover: _gameHasWinner || _gameHasDraw,
              draw: _gameHasDraw,
            },
          }),
        );
      } else {
        this.store.dispatch(switchPlayer());
      }
    }
  }

  private checkForWinner(): boolean {
    const _winnerFound = this.checkHorizontal() || this.checkVertical() || this.checkDiagonal();
    return _winnerFound;
  }

  private checkForDraw(): boolean {
    const _remainingEmpty = this.board.flatMap((c) => c.filter((e) => e.state === ColorEnum.EMPTY)) || [];
    return _remainingEmpty.length === 0;
  }

  private checkVertical(): boolean {
    let _gameIsOver = false;
    this.board.forEach((col) => {
      let _matchCount = 1;

      col.forEach((field, i, arr) => {
        if (field.state !== ColorEnum.EMPTY && field.state === arr[i - 1]?.state) {
          _matchCount++;
        } else {
          _matchCount = 1;
        }

        if (_matchCount === 4) {
          console.info('4 in a row (vertical)!');
          _gameIsOver = true;
        }
      });
    });

    return _gameIsOver;
  }
  private checkHorizontal(): boolean {
    let _gameIsOver = false;

    for (let _rowIndex = 0; _rowIndex < this.board[0].length; _rowIndex++) {
      const _row = this.board.flatMap((col) => col[_rowIndex]);
      let _matchCount = 1;

      _row.forEach((field, i, arr) => {
        if (field.state !== ColorEnum.EMPTY && field.state === arr[i - 1]?.state) {
          _matchCount++;
        } else {
          _matchCount = 1;
        }

        if (_matchCount === 4) {
          console.info('4 in a row (horizontal)!');
          _gameIsOver = true;
        }
      });
    }

    return _gameIsOver;
  }

  private checkDiagonal(): boolean {
    let _gameIsOver = false;

    this.board.forEach((col, i, board) => {
      col.forEach((field, j, currentCol) => {
        //from south east to north west
        let _localIndex1 = i + 1;
        let _localIndex2 = j + 1;
        let _matchCount = 1;

        while (_localIndex1 <= board.length || _localIndex2 <= currentCol.length) {
          if (field.state !== ColorEnum.EMPTY && field.state === board[_localIndex1]?.[_localIndex2]?.state) {
            _matchCount++;
          } else {
            _matchCount = 1;
          }

          if (_matchCount === 4) {
            console.info('4 in a row (diagonal, se->nw)!');
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
          if (field.state !== ColorEnum.EMPTY && field.state === board[_localIndex1]?.[_localIndex2]?.state) {
            _matchCount++;
          } else {
            _matchCount = 1;
          }

          if (_matchCount === 4) {
            console.info('4 in a row (diagonal, ne->sw)!');
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
