import { ReactElement, useEffect } from 'react';
import CellsModel from '../../models/CellsModel';
import { getBoardSizes } from '../../utils/utils';

type CellProps = {
    cell: CellsModel;
    onClick?: (cell: CellsModel) => void;
    selected?: boolean;
    isValidMove?: boolean
    matchHistory?: { origin_x?: number, origin_y?: number, destiny_x?: number, destiny_y?: number, was_capture?: boolean } | null
};

export const Cell = ({ cell, onClick, selected, isValidMove, matchHistory }: CellProps): ReactElement => {
    const { figure, label } = cell;
    const sizes = getBoardSizes()

    // Definindo as classes base para a célula
    const baseClasses = `flex w-[2.875rem] h-[2.875rem] justify-center items-center m-0 p-0`;
    const validMoveClass = isValidMove ? 'bg-green-500' : '';
    // Classes adicionais baseadas no label (escuro ou claro)
    const labelClass = label === 'dark' ? 'bg-black' : 'bg-gray-300';

    const oldMove = 'opacity-30';
    const newMove = 'bg-green-500';
    const captured = 'bg-red-500';
    const isOldMove = matchHistory?.origin_x == cell.x && matchHistory?.origin_y == cell.y
    const isNewMove = matchHistory?.destiny_x == cell.x && matchHistory?.destiny_y == cell.y
    useEffect(() => {
        console.log(matchHistory?.origin_x, cell.x)
    }, [])

    return (
        <div className={`
        ${baseClasses} 
        ${labelClass}
        ${isOldMove ? oldMove : ''}
        ${isNewMove ? newMove : ''}

        ${selected ? 'border-[3px] border-blue-600' : ''} 
        ${validMoveClass}`} onClick={() => onClick?.(cell)}>
            {figure?.imageSrc && <img className={`w-[2.875rem] h-[2.875rem]`} src={figure.imageSrc} alt={figure.name} />}
        </div>
    );
};