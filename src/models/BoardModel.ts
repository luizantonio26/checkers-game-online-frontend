import CellsModel from "./CellsModel";
import { Labels } from "./Labels";


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
}