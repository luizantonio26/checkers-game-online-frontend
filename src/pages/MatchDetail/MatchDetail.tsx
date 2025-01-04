import { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Board } from "../../components/Board/Board";
import BoardModel from "../../models/BoardModel";
import { MatchMoviments } from "../../models/MatchHistory";
import { showState } from "../../utils/utils";


export const MatchDetail = (): ReactElement => {
    const location = useLocation()
    const movements = location.state?.movements
    const [selectedMovement, setSelectedMovement] = useState<MatchMoviments | null>(null)
    const [board, setBoard] = useState<BoardModel>(new BoardModel())

    useEffect(() => {
        const newBoard = new BoardModel();
        newBoard.createCells();
        setBoard(newBoard);
    }, [movements])

    const handleMovementClick = (movement: MatchMoviments) => {
        setSelectedMovement(movement)
    }

    const restart = (gameState: (boolean | {
        piece_color: string;
        piece_type: string;
        piece_position: number[];
    })[][]) => {
        const newBoard = new BoardModel();
        newBoard.createCells();
        showState(newBoard, gameState, "black", "white");
        setBoard(newBoard);
    }

    const mergeState = (oldState: Array<Array<boolean | { piece_color: string; piece_type: string; piece_position: number[] }>>, newState: Array<Array<boolean | { piece_color: string; piece_type: string; piece_position: number[] }>>, destiny_x: number, destiny_y: number) => {
        const newBoard = new BoardModel();
        if (oldState && newState) {
            newBoard.createCells();
            oldState[destiny_x][destiny_y] = newState[destiny_x][destiny_y];
            showState(newBoard, oldState, "black", "white");
            setBoard(newBoard);
            console.log(oldState)
        }
    }

    useEffect(() => {
        if (selectedMovement?.state_before_move) {
            mergeState(selectedMovement?.state_before_move, selectedMovement?.state_after_move, selectedMovement?.destiny_x, selectedMovement?.destiny_y)
        }
    }, [selectedMovement])

    return (
        <div className="bg-gray-600 w-full lg:flex-col lg:gap-2 lg:justify-center p-6 h-lvh">
            <div className="flex flex-wrap gap-6 w-full justify-center">
                <div className="flex flex-col items-center gap-3">
                    <h1 className="text-3xl font-bold text-white">Board</h1>
                    <Board board={board} onSetBoard={setBoard} moviment={selectedMovement} />
                </div>
                <div className="flex flex-col items-center gap-3">
                    <h1 className="text-3xl font-bold text-white">Movimentos</h1>
                    <div className="md:flex flex-col gap-2 p-4 overflow-scroll h-[23rem]">
                        {movements && movements.map((movements: MatchMoviments) => (
                            <div className={"bg-white rounded-lg p-4 shadow-md cursor-pointer" + (movements == selectedMovement ? " text-blue-600 border-[1px] border-blue-600" : " text-gray-600")} onClick={() => handleMovementClick(movements)}>
                                <div className={"font-bold text-md"}>
                                    id: {movements.id} - Piece: {movements.piece_color} - Type: {movements.piece_type}
                                </div>
                                <div className="text-gray-600">
                                    From {movements.origin_x} - {movements.origin_y} To {movements.destiny_x} - {movements.destiny_y}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}