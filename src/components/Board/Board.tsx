import { Fragment, ReactElement, useState } from 'react';
import BoardModel from '../../models/BoardModel';
import CellsModel from '../../models/CellsModel';
import { getBoardSizes } from '../../utils/utils';
import { useAuth } from '../Auth/AuthContext';
import { Cell } from '../Cell';

type BoardProps = {
    board: BoardModel;
    onSetBoard: (board: BoardModel) => void;
    moveAction: (from: CellsModel, to: CellsModel) => void;
    playerTurn: string;
};

export const Board = ({ board, onSetBoard, moveAction, playerTurn }: BoardProps): ReactElement => {
    const { user } = useAuth();
    const [selectedCell, setSelectedCell] = useState<null | CellsModel>(null);
    const [validMoves, setValidMoves] = useState<CellsModel[] | null>(null);
    const sizes = getBoardSizes();

    const handleClick = (cell: CellsModel) => {
        if (selectedCell) {
            if (selectedCell === cell) {
                setSelectedCell(null);
                setValidMoves(null);
            } else if (isCellValidMove(cell)) {
                //onSetBoard(board.moveFigure(selectedCell, cell));
                setSelectedCell(null);
                setValidMoves(null);
                moveAction(selectedCell, cell);
            } else {
                if (user?.nickname !== cell.player || playerTurn !== user?.nickname) return;
                setSelectedCell(cell);
                setValidMoves(cell.getValidMoves());
            }
        } else {
            if (user?.nickname !== cell.player || playerTurn !== user?.nickname) return;
            setValidMoves(cell.getValidMoves());
            setSelectedCell(cell);
        }
    }

    const isCellValidMove = (cell: CellsModel): boolean => {
        if (!validMoves) return false;
        return validMoves.includes(cell);
    };

    const isSelectedCell = (cell: CellsModel): boolean => {
        if (!selectedCell) return false;
        return selectedCell.key === cell.key;
    }

    return (
        <div className={`flex flex-wrap w-[25rem] h-[25rem]`}>
            {
                board.cells.map((row, index) => (
                    <Fragment key={index}>
                        {row.map((cell, index) => (
                            <Cell cell={cell} key={cell.key} onClick={() => handleClick(cell)} isValidMove={isCellValidMove(cell)} selected={isSelectedCell(cell)} />
                        ))}
                    </Fragment>
                ))
            }
        </div>
    );
};