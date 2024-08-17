import { Fragment, ReactElement } from 'react';
import BoardModel from '../../models/BoardModel';
import { Cell } from '../Cell';
import './Board.css';

type BoardProps = {
    board: BoardModel;
    onSetBoard: (board: BoardModel) => void;
};

export const Board = ({ board, onSetBoard }: BoardProps): ReactElement => {
    return (
        <div className="board">
            {
                board.cells.map((row, index) => (
                    <Fragment key={index}>
                        {row.map((cell, index) => (
                            <Cell label={cell.label} key={cell.key} />
                        ))}
                    </Fragment>
                ))
            }
        </div>
    );
};