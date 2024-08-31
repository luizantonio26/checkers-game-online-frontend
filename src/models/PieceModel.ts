import damaImgDark from "../images/brown-queen.png";
import pieceImgDark from "../images/brown.png";
import damaImgLight from "../images/light-queen.png";
import pieceImgLight from "../images/light.png";
import CellsModel from "./CellsModel";
import { FigureNames } from "./FigureNames";
import { Labels } from "./Labels";



class PieceModel {
    label: Labels;
    imageSrc: string;
    isDama: boolean;
    cell: CellsModel;
    name: FigureNames;

    constructor(
        label: Labels, cell: CellsModel) {
        this.label = label;
        this.cell = cell;
        this.cell.figure = this;
        this.isDama = false;
        this.imageSrc = label === Labels.Light ? pieceImgLight : pieceImgDark;
        this.name = FigureNames.Piece;
    }
}

class DamaModel {
    label: Labels;
    imageSrc: string;
    isDama: boolean;
    cell: CellsModel;
    name: FigureNames;

    constructor(
        label: Labels, cell: CellsModel) {
        this.label = label;
        this.cell = cell;
        this.cell.figure = this;
        this.isDama = true;
        this.imageSrc = label === Labels.Light ? damaImgLight : damaImgDark;
        this.name = FigureNames.Piece;
    }
}

export { DamaModel, PieceModel };

