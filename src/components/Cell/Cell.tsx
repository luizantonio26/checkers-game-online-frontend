import { ReactElement } from 'react';
import CellsModel from '../../models/CellsModel';
import { mergeClasses } from '../../utils/utils';
import './Cell.css';

type CellProps = {
    cell: CellsModel;
};

export const Cell = ({ cell }: CellProps): ReactElement => {
    const { figure, label } = cell;
    return (
        <div className={mergeClasses('cell', label)}>
            {figure?.imageSrc && <img className="icon" src={figure.imageSrc} alt={figure.name} />}
        </div>
    );
};