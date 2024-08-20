import { ReactElement } from 'react';
import CellsModel from '../../models/CellsModel';
import { getBoardSizes } from '../../utils/utils';

type CellProps = {
    cell: CellsModel;
};

export const Cell = ({ cell }: CellProps): ReactElement => {
    const { figure, label } = cell;
    const sizes = getBoardSizes()

    // Definindo as classes base para a célula
    const baseClasses = `flex w-[50px] h-[50px] justify-center items-center`;
    // Classes adicionais baseadas no label (escuro ou claro)
    const labelClass = label === 'dark' ? 'bg-black' : 'bg-[#e3b778]';

    return (
        <div className={`${baseClasses} ${labelClass}`}>
            {figure?.imageSrc && <img className={`w-[50px] h-[50px]`} src={figure.imageSrc} alt={figure.name} />}
        </div>
    );
};