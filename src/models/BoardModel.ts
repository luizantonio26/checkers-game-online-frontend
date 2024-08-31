import CellsModel from "./CellsModel";
import { Labels } from "./Labels";
import { DamaModel, PieceModel } from "./PieceModel";


export default class BoardModel {
    cells: CellsModel[][] = [];
    cellsInRow: number = 8;

    createCells() {
        for (let i = 0; i < this.cellsInRow; i++) {
            const row: CellsModel[] = [];

            for (let j = 0; j < this.cellsInRow; j++) {
                if ((i + j) % 2 !== 0) {
                    row.push(new CellsModel(i, j, Labels.Dark, this));
                } else {
                    row.push(new CellsModel(i, j, Labels.Light, this));
                }
            }
            this.cells.push(row);
        }
    }

    setAvailable(x: number, y: number, available: boolean) {
        this.getCell(x, y).available = available;
    }

    getCell(x: number, y: number) {
        return this.cells[y][x];
    }

    addFigure(label: Labels, x: number, y: number) {
        new PieceModel(label, this.getCell(x, y));
    }

    addPlayer(x: number, y: number, player: string | null) {
        this.getCell(x, y).player = player;
    }

    addDama(label: Labels, x: number, y: number) {
        new DamaModel(label, this.getCell(x, y));
    }
}