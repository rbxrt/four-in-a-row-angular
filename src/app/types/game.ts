export interface GameStateProps {
  gameover: boolean;
  draw: boolean;
  player: number;
}

export interface GameStatisticsProps {
  yellowIsWinner: number;
  redIsWinner: number;
  draw: number;
}

export interface GameSettingsProps {
  width: number;
  height: number;
}
