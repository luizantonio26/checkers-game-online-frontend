import BoardModel from "../models/BoardModel";
import { Labels } from "../models/Labels";

// utils/utils.ts
export const mergeClasses = (...rest: string[]): string => {
    return rest.join(' ');
};

export interface BoardSizes {
    sufix: string,
    board: string,
    cell: string
}

export const getBoardSizes = (): BoardSizes => {
    const size = 50;
    return {
        sufix: 'px',
        board: (size * 8).toString(),
        cell: size.toString()
    }
}

export function showState(board: BoardModel, data: any, blackPlayer: string | null, whitePlayer: string | null) {
    for (let row = 0; row < data.length; row++) {
        for (let col = 0; col < data[row].length; col++) {
            if (typeof (data[row][col]) === "object") {
                const x = data[row][col].piece_position[1];
                const y = data[row][col].piece_position[0];
                const player = data[row][col].piece_color === "black" ? blackPlayer : whitePlayer
                const label = data[row][col].piece_color === "black" ? Labels.Dark : Labels.Light

                board.addPlayer(x, y, player)
                data[row][col].piece_type === "Dama" ? board.addDama(label, x, y) : board.addFigure(label, x, y)
            } else {
                board.setAvailable(row, col, data[row][col]);
            }
        }
    }
}