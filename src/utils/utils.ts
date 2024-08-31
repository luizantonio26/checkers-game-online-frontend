
// utils/utils.ts
export const mergeClasses = (...rest: string[]): string => {
    return rest.join(' ');
};

export interface BoardSizes {
    sufix: string,
    board: string,
    cell: string
}

export const getBoardSizes = (): BoardSizes => {
    const size = 50;
    return {
        sufix: 'px',
        board: (size * 8).toString(),
        cell: size.toString()
    }
}