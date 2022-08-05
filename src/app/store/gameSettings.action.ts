import { createAction, props } from '@ngrx/store';

export interface GameSettingsProps {
    width: number; 
    height: number;
  }

export enum GameSettingActions {
  SetDimensions = '[Settings Component] Board dimensions updated',
  ResetDimensions = '[Settings Component] Settings reverted'
}

export const setBoardDimensions = createAction(GameSettingActions.SetDimensions, props<{board: GameSettingsProps}>());
export const resetBoardDimensions = createAction(GameSettingActions.ResetDimensions);