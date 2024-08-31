import { ReactElement } from 'react';
import CellsModel from '../../models/CellsModel';
import { getBoardSizes } from '../../utils/utils';

type CellProps = {
    cell: CellsModel;
    onClick?: (cell: CellsModel) => void;
    selected?: boolean;
    isValidMove?: boolean
};

export const Cell = ({ cell, onClick, selected, isValidMove }: CellProps): ReactElement => {
    const { figure, label } = cell;
    const sizes = getBoardSizes()

    // Definindo as classes base para a célula
    const baseClasses = `flex w-[3rem] h-[3rem] justify-center items-center m-0`;
    const validMoveClass = isValidMove ? 'bg-green-500' : '';
    // Classes adicionais baseadas no label (escuro ou claro)
    const labelClass = label === 'dark' ? 'bg-black' : 'bg-gray-300';

    return (
        <div className={`${baseClasses} ${labelClass} ${selected ? 'border-[3px] border-blue-600' : ''} ${validMoveClass}`} onClick={() => onClick?.(cell)}>
            {figure?.imageSrc && <img className={`w-[3rem] h-[3rem]`} src={figure.imageSrc} alt={figure.name} />}
        </div>
    );
};