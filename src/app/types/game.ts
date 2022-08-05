
export enum ColorEnum {
    RED,
    YELLOW,
    EMPTY
}

export enum ResultEnum {
    Red = "Red",
    Yellow = "Yellow",
    None = "Draw"
}

export interface GameStatistics {
    yellowIsWinner: number,
    redIsWinner: number
}