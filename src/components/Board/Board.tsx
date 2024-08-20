import { Fragment, ReactElement } from 'react';
import BoardModel from '../../models/BoardModel';
import { getBoardSizes } from '../../utils/utils';
import { Cell } from '../Cell';

type BoardProps = {
    board: BoardModel;
    onSetBoard: (board: BoardModel) => void;
};

export const Board = ({ board, onSetBoard }: BoardProps): ReactElement => {
    const sizes = getBoardSizes();
    return (
        <div className={`flex flex-wrap mt-16 w-[400px] h-[400px]`}>
            {
                board.cells.map((row, index) => (
                    <Fragment key={index}>
                        {row.map((cell, index) => (
                            <Cell cell={cell} key={cell.key} />
                        ))}
                    </Fragment>
                ))
            }
        </div>
    );
};