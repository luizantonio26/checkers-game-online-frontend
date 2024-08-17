import pieceImgDark from "../images/brown.png";
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

export { PieceModel };

