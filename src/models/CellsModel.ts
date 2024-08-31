import BoardModel from './BoardModel';
import { Labels } from "./Labels";
import { PieceModel } from './PieceModel';

export default class CellsModel {
    readonly x: number;
    readonly y: number;
    readonly label: Labels;
    figure: PieceModel | null;
    player: string | null;
    board: BoardModel;
    available: boolean;
    key: string;

    constructor(x: number, y: number, label: Labels, board: BoardModel) {
        this.x = x;
        this.y = y;
        this.label = label;
        this.board = board;
        this.available = false;
        this.key = `${String(x)}${String(y)}`
        this.figure = null;
        this.player = null;
    }


    getValidMoves(): CellsModel[] {
        const validMoves: CellsModel[] = [];
        if (this.figure) {
            const piece = this.figure;
            const board = this.board;

            if (piece.isDama) {
                this._getValidDamaMoves(validMoves, piece, board);
            } else {
                this._getValidPieceMoves(validMoves, piece, board);
            }
        }

        return validMoves;
    }

    private _getValidPieceMoves(validMoves: CellsModel[], piece: PieceModel, board: BoardModel): void {
        if (piece.label === Labels.Light) {
            const moves = [
                [-1, 1],
                [-1, -1],
            ];

            for (const move of moves) {
                const x = this.x + move[0];
                const y = this.y + move[1];
                if (x < 0 || x >= 8 || y < 0 || y >= 8) {
                    continue
                }
                const cell = board.getCell(y, x);
                if (cell.figure) {
                    if (cell.figure.label === Labels.Dark) {
                        const xi = x + move[0];
                        const yi = y + move[1];
                        if (xi < 0 || xi >= 8 || yi < 0 || yi >= 8) {
                            continue
                        }
                        const celli = board.getCell(yi, xi);
                        if (!celli.figure && cell.label == "dark") {
                            validMoves.push(celli);
                        }
                    }
                } else if (cell.label == "dark") {
                    validMoves.push(cell);
                }
            }
        }

        if (piece.label === Labels.Dark) {
            const moves = [
                [1, 1],
                [1, -1],
            ];

            for (const move of moves) {
                const x = this.x + move[0];
                const y = this.y + move[1];
                if (y < 0 || y >= 8 || x < 0 || x >= 8) {
                    continue
                }
                const cell = board.getCell(y, x);
                if (cell.figure) {
                    if (cell.figure.label === Labels.Light) {
                        const xi = x + move[0];
                        const yi = y + move[1];
                        if (xi < 0 || xi >= 8 || yi < 0 || yi >= 8) {
                            continue
                        }
                        const celli = board.getCell(yi, xi);
                        if (!celli.figure && cell.label == "dark") {
                            validMoves.push(celli);
                        }
                    }
                } else if (cell.label == "dark") {
                    validMoves.push(cell);
                }
            }
        }
    }

    private _getValidDamaMoves(validMoves: CellsModel[], piece: PieceModel, board: BoardModel): void {
        const moves = [
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1]
        ];

        for (const move of moves) {
            const x = this.x + move[0];
            const y = this.y + move[1];
            if (y < 0 || y >= 8 || x < 0 || x >= 8) {
                continue
            }
            const cell = board.getCell(y, x);
            if (cell.figure) {
                if (piece.label !== cell.figure.label) {
                    const xi = x + move[0];
                    const yi = y + move[1];
                    if (xi < 0 || xi >= 8 || yi < 0 || yi >= 8) {
                        continue
                    }
                    const celli = board.getCell(yi, xi);
                    if (!celli.figure && cell.label == "dark") {
                        validMoves.push(celli);
                    }
                }
            } else if (cell.label == "dark") {
                validMoves.push(cell);
            }
        }
    }
}