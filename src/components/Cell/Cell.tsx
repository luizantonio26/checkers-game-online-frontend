import { ReactElement } from 'react';
import { Labels } from '../../models/Labels';
import { mergeClasses } from '../../utils/utils';
import './Cell.css';

type CellProps = {
    label: Labels;
};

export const Cell = ({ label }: CellProps): ReactElement => {
    return <div className={mergeClasses('cell', label)}></div>;
}