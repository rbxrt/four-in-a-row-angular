import { createReducer, on } from '@ngrx/store';
import { GameSettingsProps } from 'types';

import { resetBoardDimensions, setBoardDimensions } from './gameSettings.action';

export const initialState: GameSettingsProps = {
  width: 7,
  height: 6,
};

//TODO: load dimensions from local storage.
export const gameSettingsReducer = createReducer(
  initialState,
  on(setBoardDimensions, (state, { board }): GameSettingsProps => {
    return { ...state, width: board.width, height: board.height };
  }),
  on(resetBoardDimensions, (): GameSettingsProps => initialState),
);
