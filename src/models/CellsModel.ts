import BoardModel from './BoardModel';
import { Labels } from "./Labels";

export default class CellsModel {
    readonly x: number;
    readonly y: number;
    readonly label: Labels;
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
    }
}